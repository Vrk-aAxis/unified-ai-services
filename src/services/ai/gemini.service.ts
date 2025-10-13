import { GoogleGenAI } from '@google/genai';

import { AIServiceInterface } from '@/interfaces/ai.interface.js';

export class GeminiService implements AIServiceInterface {
  private client: GoogleGenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    // Set API key in environment for the SDK
    process.env.GOOGLE_GENAI_API_KEY = apiKey;
    this.client = new GoogleGenAI({});
    this.model = 'gemini-2.0-flash-exp';
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    let text = response.text;
    if (!text) {
      throw new Error('No response from Gemini API');
    }

    // Remove markdown code blocks if present (handle various formats)
    text = text
      .replace(/^```json\s*/g, '')
      .replace(/^```\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    return text;
  }

  getModelName(): string {
    return this.model;
  }

  supportsStructuredOutput(): boolean {
    return false;
  }
}
