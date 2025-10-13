interface GeminiConfig {
  apiKey: string;
  model: string;
}

interface OpenRouterConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
  siteUrl: string;
  siteName: string;
}

interface AIConfiguration {
  gemini: GeminiConfig;
  openrouter: OpenRouterConfig;
}

export const aiConfig: AIConfiguration = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash-exp',
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: 'alibaba/tongyi-deepresearch-30b-a3b:free',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    siteUrl: process.env.OPENROUTER_SITE_URL || '',
    siteName: process.env.OPENROUTER_SITE_NAME || '',
  },
};
