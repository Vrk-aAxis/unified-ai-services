import {
  AIProvider,
  ProductInput,
  PRDData,
  AIServiceInterface,
} from '../interfaces/ai.interface.js';
import { PRD_RESPONSE_SCHEMA } from '../schemas/prd.schema.js';
import { formatPRDPrompt } from '../prompts/prd.prompt.js';
import { AIFactory } from './ai/ai.factory.js';

// Supported providers for PRD generation
const SUPPORTED_PRD_PROVIDERS: AIProvider[] = [
  AIProvider.GROQ, // Best: Fast + Structured output
  AIProvider.OPENROUTER, // Good: JSON mode
  // AIProvider.GEMINI, // Not recommended: Slow + parsing errors
];

export class PRDGeneratorService {
  static getSupportedProviders(): AIProvider[] {
    return SUPPORTED_PRD_PROVIDERS;
  }

  static async generate(
    productInput: ProductInput,
    provider: AIProvider = AIProvider.GROQ
  ): Promise<PRDData> {
    // Validate provider
    if (!SUPPORTED_PRD_PROVIDERS.includes(provider)) {
      throw new Error(
        `Provider ${provider} not supported for PRD generation. Use: ${SUPPORTED_PRD_PROVIDERS.join(', ')}`
      );
    }

    const aiService: AIServiceInterface = AIFactory.getService(provider);
    const prompt = formatPRDPrompt(JSON.stringify(productInput, null, 2));

    let responseText: string;

    // Use structured output if supported
    if (aiService.supportsStructuredOutput() && aiService.generateWithSchema) {
      // Groq with strict JSON schema
      responseText = await aiService.generateWithSchema(
        prompt,
        PRD_RESPONSE_SCHEMA
      );
    } else if (
      aiService.supportsStructuredOutput() &&
      'generateWithJsonMode' in aiService
    ) {
      // OpenRouter with JSON mode
      responseText = await (
        aiService as { generateWithJsonMode: (p: string) => Promise<string> }
      ).generateWithJsonMode(prompt);
    } else {
      // Gemini - plain text
      responseText = await aiService.generate(prompt);
    }

    // Parse response
    try {
      const parsed = JSON.parse(responseText) as PRDData;

      // Fill in required fields if missing (fallback for non-strict providers)
      if (parsed.features) {
        parsed.features = parsed.features.map((f) => ({
          ...f,
          dependencies: f.dependencies ?? [],
          estimation: f.estimation ?? { storyPoints: 0, tshirtSize: 'M' },
        }));
      }
      if (parsed.architecture?.security) {
        parsed.architecture.security.compliance =
          parsed.architecture.security.compliance ?? [];
      }
      if (parsed.techStack) {
        parsed.techStack.other = parsed.techStack.other ?? '';
      }

      return parsed;
    } catch (error) {
      throw new Error(`Failed to parse PRD response: ${String(error)}`);
    }
  }

  static getProviderInfo(provider: AIProvider): {
    supported: boolean;
    speed: string;
    quality: string;
  } {
    const info = {
      [AIProvider.GROQ]: {
        supported: true,
        speed: '3-5s',
        quality: 'Excellent (Structured output)',
      },
      [AIProvider.OPENROUTER]: {
        supported: true,
        speed: '10-15s',
        quality: 'Good (JSON mode)',
      },
      [AIProvider.GEMINI]: {
        supported: false,
        speed: '25s+',
        quality: 'Poor (Manual parsing, errors)',
      },
    };

    return (
      info[provider] ?? {
        supported: false,
        speed: 'Unknown',
        quality: 'Unknown',
      }
    );
  }
}
