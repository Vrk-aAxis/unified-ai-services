import { AIServiceInterface } from '../../interfaces/ai.interface.js';

interface GroqMessage {
  role: string;
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GroqService implements AIServiceInterface {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not set');
    }
    this.apiKey = apiKey;
    this.model = 'openai/gpt-oss-20b'; // Fast and supports structured output
    this.baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
  }

  async generate(prompt: string): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
    }

    const data = (await response.json()) as GroqResponse;
    const text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No response from Groq API');
    }

    return text;
  }

  async generateWithSchema(prompt: string, schema: object): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'response',
            schema,
            strict: true,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
    }

    const data = (await response.json()) as GroqResponse;
    const text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No response from Groq API');
    }

    return text;
  }

  supportsStructuredOutput(): boolean {
    return true;
  }

  getModelName(): string {
    return this.model;
  }
}
