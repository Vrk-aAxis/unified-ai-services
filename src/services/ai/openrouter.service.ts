import { AIServiceInterface } from '@/interfaces/ai.interface.js';

interface OpenRouterMessage {
  role: string;
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenRouterService implements AIServiceInterface {
  private apiKey: string;
  private model: string;
  private baseUrl: string;
  private siteUrl: string;
  private siteName: string;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
    this.apiKey = apiKey;
    this.model = 'alibaba/tongyi-deepresearch-30b-a3b:free';
    this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
    this.siteUrl = process.env.OPENROUTER_SITE_URL || 'http://localhost:3000';
    this.siteName =
      process.env.OPENROUTER_SITE_NAME || 'Generative-AI-Services';
  }

  async generate(prompt: string): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer': this.siteUrl,
        'X-Title': this.siteName,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        // Don't use response_format for plain text generation
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = (await response.json()) as OpenRouterResponse;
    let text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No response from OpenRouter API');
    }

    // Remove markdown code blocks if present (handle various formats)
    text = text
      .replace(/^```json\s*/g, '')
      .replace(/^```\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    return text;
  }

  async generateWithJsonMode(prompt: string): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer': this.siteUrl,
        'X-Title': this.siteName,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = (await response.json()) as OpenRouterResponse;
    let text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No response from OpenRouter API');
    }

    // Remove markdown code blocks if present (handle various formats)
    text = text
      .replace(/^```json\s*/g, '')
      .replace(/^```\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    return text;
  }

  supportsStructuredOutput(): boolean {
    return true;
  }

  getModelName(): string {
    return this.model;
  }
}
