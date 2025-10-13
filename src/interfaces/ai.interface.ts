export enum AIProvider {
  GEMINI = 'gemini',
  OPENROUTER = 'openrouter',
  GROQ = 'groq',
}

export interface ProductInput {
  productName: string;
  version: string;
  targetAudience: string;
  primaryGoals: string[];
  highLevelProblem: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
    other?: string;
  };
}

export interface GenerateRequest {
  productInput: ProductInput;
  provider: AIProvider;
}

export interface PRDData {
  title: string;
  version: string;
  overview: {
    problem: string;
    solution: string;
    objectives: string[];
  };
  marketAnalysis: {
    marketSize: string;
    growthTrends: string[];
    competitors: Array<{
      name: string;
      strengths: string[];
      weaknesses: string[];
    }>;
  };
  userPersonas: Array<{
    personaName: string;
    description: string;
    goals: string[];
    painPoints: string[];
  }>;
  features: Array<{
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    userStories: string[];
    acceptanceCriteria: string[];
    dependencies: string[];
    estimation: {
      storyPoints: number;
      tshirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
    };
  }>;
  architecture: {
    systemOverview: string;
    components: Array<{
      name: string;
      responsibilities: string[];
      interfaces: string[];
    }>;
    dataFlow: string;
    security: {
      authentication: string;
      authorization: string;
      dataEncryption: string;
      compliance: string[];
    };
  };
  timeline: {
    phases: Array<{
      name: string;
      startDate: string;
      endDate: string;
      deliverables: string[];
    }>;
    milestones: Array<{
      name: string;
      date: string;
      description: string;
    }>;
  };
  successMetrics: Array<{
    metric: string;
    target: string;
    measurementMethod: string;
  }>;
  risks: Array<{
    risk: string;
    impact: 'High' | 'Medium' | 'Low';
    probability: 'High' | 'Medium' | 'Low';
    mitigationPlan: string;
  }>;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
    other: string;
  };
  appendices?: Array<{
    title: string;
    description: string;
    url?: string;
  }>;
}

export interface GenerateResponse {
  provider: AIProvider;
  data: PRDData;
  model: string;
  timestamp: string;
}

export interface AIServiceInterface {
  generate(prompt: string): Promise<string>;
  generateWithSchema?(prompt: string, schema: object): Promise<string>;
  getModelName(): string;
  supportsStructuredOutput(): boolean;
}

export interface ProjectDescriptionInput {
  // Quick mode
  simplePrompt?: string;

  // Detailed mode
  projectName?: string;
  category?: string;
  purpose?: string;
  targetUsers?: string;
  keyFeatures?: string[];

  // Common
  provider?: string;
}

export interface ProjectDescriptionResponse {
  description: string;
  provider: AIProvider;
  model: string;
  generatedFrom: 'simple_prompt' | 'structured_input' | 'hybrid';
  timestamp: string;
}
