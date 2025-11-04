import {
  AIProvider,
  TaskDescriptionInput,
  TaskDescriptionSimpleResponse,
  TaskDescriptionDetailedResponse,
  TaskDescriptionDetailedData,
  AIServiceInterface,
} from '../interfaces/ai.interface.js';
import { TASK_DESCRIPTION_DETAILED_SCHEMA } from '../schemas/task-description.schema.js';
import {
  buildSimpleTaskDescriptionPrompt,
  buildDetailedTaskDescriptionPrompt,
} from '../prompts/task-description.prompt.js';
import { AIFactory } from './ai/ai.factory.js';

// All providers supported for task description generation
const SUPPORTED_PROVIDERS: AIProvider[] = [
  AIProvider.GROQ, // Fastest: 2-3s (structured output)
  AIProvider.OPENROUTER, // Good: 8-10s (JSON mode)
  AIProvider.GEMINI, // Okay: 15-20s (text parsing)
];

export class TaskDescriptionGeneratorService {
  static getSupportedProviders(): AIProvider[] {
    return SUPPORTED_PROVIDERS;
  }

  static async generate(
    input: TaskDescriptionInput,
    provider: AIProvider = AIProvider.GROQ
  ): Promise<TaskDescriptionSimpleResponse | TaskDescriptionDetailedResponse> {
    // Validate provider
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
      throw new Error(
        `Provider ${provider} not supported. Use: ${SUPPORTED_PROVIDERS.join(', ')}`
      );
    }

    // Validate responseType
    if (input.responseType !== 'simple' && input.responseType !== 'detailed') {
      throw new Error('responseType must be either "simple" or "detailed"');
    }

    const aiService: AIServiceInterface = AIFactory.getService(provider);

    if (input.responseType === 'simple') {
      return this.generateSimple(input, provider, aiService);
    } else {
      return this.generateDetailed(input, provider, aiService);
    }
  }

  private static async generateSimple(
    input: TaskDescriptionInput,
    provider: AIProvider,
    aiService: AIServiceInterface
  ): Promise<TaskDescriptionSimpleResponse> {
    const prompt = buildSimpleTaskDescriptionPrompt(input);
    const rawDescription = await aiService.generate(prompt);

    // Clean up response
    const description = this.cleanDescription(rawDescription);

    return {
      taskDescription: description,
      responseType: 'simple',
      provider,
      model: aiService.getModelName(),
      timestamp: new Date().toISOString(),
    };
  }

  private static async generateDetailed(
    input: TaskDescriptionInput,
    provider: AIProvider,
    aiService: AIServiceInterface
  ): Promise<TaskDescriptionDetailedResponse> {
    const prompt = buildDetailedTaskDescriptionPrompt(input);

    let responseText: string;

    // Use structured output if supported
    if (aiService.supportsStructuredOutput() && aiService.generateWithSchema) {
      // Groq with strict JSON schema
      responseText = await aiService.generateWithSchema(
        prompt,
        TASK_DESCRIPTION_DETAILED_SCHEMA
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
      // Gemini - plain text, parse JSON
      responseText = await aiService.generate(prompt);
    }

    // Parse response
    try {
      const parsed = JSON.parse(responseText) as TaskDescriptionDetailedData;

      // Ensure all required fields are present
      // For optional fields, use parsed value if available, otherwise fall back to input
      const taskDescription: TaskDescriptionDetailedData = {
        overview: parsed.overview || '',
        detailedDescription: parsed.detailedDescription || '',
        technicalSteps: parsed.technicalSteps || [],
        acceptanceCriteria: parsed.acceptanceCriteria || [],
        testingRequirements: parsed.testingRequirements || [],
        dependencies: parsed.dependencies || [],
        deliverables: parsed.deliverables || [],
        risks: parsed.risks || [],
        // Optional fields - include if they have a value (non-empty string)
        ...(parsed.estimatedEffort || input.estimatedEffort
          ? {
              estimatedEffort:
                parsed.estimatedEffort || input.estimatedEffort || '',
            }
          : {}),
        ...(parsed.notes || input.constraints
          ? { notes: parsed.notes || input.constraints || '' }
          : {}),
        ...(parsed.userStory ? { userStory: parsed.userStory } : {}),
      };

      return {
        taskDescription,
        responseType: 'detailed',
        provider,
        model: aiService.getModelName(),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to parse task description response: ${String(error)}`
      );
    }
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

    // Remove "Task Description:" or "Description:" prefix if present
    cleaned = cleaned.replace(/^(Task )?Description:\s*/i, '');

    // Clean up excessive line breaks but preserve paragraph structure
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

    return cleaned;
  }

  static getProviderInfo(provider: AIProvider): {
    speed: string;
    reliability: string;
  } {
    const info = {
      [AIProvider.GROQ]: {
        speed: '2-3s',
        reliability: 'Excellent (Structured output)',
      },
      [AIProvider.OPENROUTER]: {
        speed: '8-10s',
        reliability: 'Good (JSON mode)',
      },
      [AIProvider.GEMINI]: {
        speed: '15-20s',
        reliability: 'Okay (Text parsing)',
      },
    };

    return info[provider] ?? { speed: 'Unknown', reliability: 'Unknown' };
  }
}
