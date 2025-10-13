import {
  AIProvider,
  AIServiceInterface,
} from '../../interfaces/ai.interface.js';

import { GeminiService } from './gemini.service.js';
import { GroqService } from './groq.service.js';
import { OpenRouterService } from './openrouter.service.js';

export class AIFactory {
  static getService(provider: AIProvider): AIServiceInterface {
    switch (provider) {
      case AIProvider.GEMINI:
        return new GeminiService();
      case AIProvider.OPENROUTER:
        return new OpenRouterService();
      case AIProvider.GROQ:
        return new GroqService();
      default: {
        const exhaustiveCheck: never = provider;
        throw new Error(`Unsupported AI provider: ${String(exhaustiveCheck)}`);
      }
    }
  }
}
