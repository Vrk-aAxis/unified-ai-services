import {
  AIProvider,
  ProjectDescriptionInput,
  ProjectDescriptionResponse,
  AIServiceInterface,
} from '@/interfaces/ai.interface.js';
import { AIFactory } from '@/services/ai/ai.factory.js';

// All providers supported for simple text generation
const SUPPORTED_PROVIDERS: AIProvider[] = [
  AIProvider.GROQ, // Fastest: 2-3s
  AIProvider.OPENROUTER, // Good: 8-10s
  AIProvider.GEMINI, // Okay: 15-20s
];

export class ProjectDescriptionGeneratorService {
  static getSupportedProviders(): AIProvider[] {
    return SUPPORTED_PROVIDERS;
  }

  static async generate(
    input: ProjectDescriptionInput,
    provider: AIProvider = AIProvider.GROQ
  ): Promise<ProjectDescriptionResponse> {
    // Validate provider
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
      throw new Error(
        `Provider ${provider} not supported. Use: ${SUPPORTED_PROVIDERS.join(', ')}`
      );
    }

    // Determine generation mode and build prompt
    const { prompt, mode } = this.buildPrompt(input);

    // Get AI service and generate
    const aiService: AIServiceInterface = AIFactory.getService(provider);
    const rawDescription = await aiService.generate(prompt);

    // Clean up response (remove extra formatting)
    const description = this.cleanDescription(rawDescription);

    return {
      description,
      provider,
      model: aiService.getModelName(),
      generatedFrom: mode,
      timestamp: new Date().toISOString(),
    };
  }

  private static buildPrompt(input: ProjectDescriptionInput): {
    prompt: string;
    mode: 'simple_prompt' | 'structured_input' | 'hybrid';
  } {
    const hasStructured =
      input.projectName || input.category || input.purpose || input.targetUsers;
    const hasSimple = input.simplePrompt;

    // Hybrid mode: Both structured and simple
    if (hasStructured && hasSimple) {
      return {
        prompt: this.buildHybridPrompt(input),
        mode: 'hybrid',
      };
    }

    // Structured mode
    if (hasStructured) {
      return {
        prompt: this.buildStructuredPrompt(input),
        mode: 'structured_input',
      };
    }

    // Simple mode
    if (hasSimple && input.simplePrompt) {
      return {
        prompt: this.buildSimplePrompt(input.simplePrompt),
        mode: 'simple_prompt',
      };
    }

    throw new Error(
      'Either simplePrompt or structured fields must be provided'
    );
  }

  private static buildSimplePrompt(simplePrompt: string): string {
    return `Generate a clear, professional project description (2-3 sentences, around 100 words) for the following project:

${simplePrompt}

The description should explain what the project is, who it's for, and its main value proposition. Write in a professional tone suitable for a project tracker or portfolio.`;
  }

  private static buildStructuredPrompt(input: ProjectDescriptionInput): string {
    const parts: string[] = [
      'Generate a clear, professional project description (2-3 sentences, around 100 words) based on these details:',
    ];

    if (input.projectName) {
      parts.push(`\nProject Name: ${input.projectName}`);
    }

    if (input.category) {
      parts.push(`Category: ${input.category}`);
    }

    if (input.purpose) {
      parts.push(`Purpose: ${input.purpose}`);
    }

    if (input.targetUsers) {
      parts.push(`Target Users: ${input.targetUsers}`);
    }

    if (input.keyFeatures && input.keyFeatures.length > 0) {
      parts.push(`Key Features: ${input.keyFeatures.join(', ')}`);
    }

    parts.push(
      "\nWrite a cohesive description that explains what the project is, who it's for, and its main value proposition. Use a professional tone suitable for a project tracker or portfolio."
    );

    return parts.join('\n');
  }

  private static buildHybridPrompt(input: ProjectDescriptionInput): string {
    const structuredPrompt = this.buildStructuredPrompt(input);

    return `${structuredPrompt}

Additional context: ${input.simplePrompt}

Incorporate this additional context into the description naturally.`;
  }

  private static cleanDescription(raw: string): string {
    // Remove markdown formatting
    let cleaned = raw
      .replace(/^```.*\n?/gm, '')
      .replace(/```\n?$/gm, '')
      .replace(/^#+\s+/gm, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .trim();

    // Remove "Description:" prefix if present
    cleaned = cleaned.replace(/^(Project )?Description:\s*/i, '');

    // Ensure it's a single paragraph (remove excessive line breaks)
    cleaned = cleaned.replace(/\n\n+/g, ' ').replace(/\n/g, ' ').trim();

    return cleaned;
  }

  static getProviderInfo(provider: AIProvider): {
    speed: string;
    reliability: string;
  } {
    const info = {
      [AIProvider.GROQ]: {
        speed: '2-3s',
        reliability: 'Excellent',
      },
      [AIProvider.OPENROUTER]: {
        speed: '8-10s',
        reliability: 'Good',
      },
      [AIProvider.GEMINI]: {
        speed: '15-20s',
        reliability: 'Okay',
      },
    };

    return info[provider] ?? { speed: 'Unknown', reliability: 'Unknown' };
  }
}
