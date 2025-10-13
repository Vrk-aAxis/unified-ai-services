export const PRD_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    version: { type: 'string' },
    overview: {
      type: 'object',
      additionalProperties: false,
      required: ['problem', 'solution', 'objectives'],
      properties: {
        problem: { type: 'string' },
        solution: { type: 'string' },
        objectives: { type: 'array', items: { type: 'string' } },
      },
    },
    marketAnalysis: {
      type: 'object',
      additionalProperties: false,
      required: ['marketSize', 'growthTrends', 'competitors'],
      properties: {
        marketSize: { type: 'string' },
        growthTrends: { type: 'array', items: { type: 'string' } },
        competitors: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'strengths', 'weaknesses'],
            properties: {
              name: { type: 'string' },
              strengths: { type: 'array', items: { type: 'string' } },
              weaknesses: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    },
    userPersonas: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['personaName', 'description', 'goals', 'painPoints'],
        properties: {
          personaName: { type: 'string' },
          description: { type: 'string' },
          goals: { type: 'array', items: { type: 'string' } },
          painPoints: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    features: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'name',
          'description',
          'priority',
          'userStories',
          'acceptanceCriteria',
          'dependencies',
          'estimation',
        ],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string', enum: ['High', 'Medium', 'Low'] },
          userStories: { type: 'array', items: { type: 'string' } },
          acceptanceCriteria: { type: 'array', items: { type: 'string' } },
          dependencies: { type: 'array', items: { type: 'string' } },
          estimation: {
            type: 'object',
            additionalProperties: false,
            required: ['storyPoints', 'tshirtSize'],
            properties: {
              storyPoints: { type: 'integer' },
              tshirtSize: { type: 'string', enum: ['XS', 'S', 'M', 'L', 'XL'] },
            },
          },
        },
      },
    },
    architecture: {
      type: 'object',
      additionalProperties: false,
      required: ['systemOverview', 'components', 'dataFlow', 'security'],
      properties: {
        systemOverview: { type: 'string' },
        components: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'responsibilities', 'interfaces'],
            properties: {
              name: { type: 'string' },
              responsibilities: { type: 'array', items: { type: 'string' } },
              interfaces: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        dataFlow: { type: 'string' },
        security: {
          type: 'object',
          additionalProperties: false,
          required: [
            'authentication',
            'authorization',
            'dataEncryption',
            'compliance',
          ],
          properties: {
            authentication: { type: 'string' },
            authorization: { type: 'string' },
            dataEncryption: { type: 'string' },
            compliance: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    timeline: {
      type: 'object',
      additionalProperties: false,
      required: ['phases', 'milestones'],
      properties: {
        phases: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'startDate', 'endDate', 'deliverables'],
            properties: {
              name: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
              deliverables: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        milestones: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'date', 'description'],
            properties: {
              name: { type: 'string' },
              date: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
      },
    },
    successMetrics: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['metric', 'target', 'measurementMethod'],
        properties: {
          metric: { type: 'string' },
          target: { type: 'string' },
          measurementMethod: { type: 'string' },
        },
      },
    },
    risks: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['risk', 'impact', 'probability', 'mitigationPlan'],
        properties: {
          risk: { type: 'string' },
          impact: { type: 'string', enum: ['High', 'Medium', 'Low'] },
          probability: { type: 'string', enum: ['High', 'Medium', 'Low'] },
          mitigationPlan: { type: 'string' },
        },
      },
    },
    techStack: {
      type: 'object',
      additionalProperties: false,
      required: ['frontend', 'backend', 'database', 'hosting', 'other'],
      properties: {
        frontend: { type: 'string' },
        backend: { type: 'string' },
        database: { type: 'string' },
        hosting: { type: 'string' },
        other: { type: 'string' },
      },
    },
  },
  required: [
    'title',
    'version',
    'overview',
    'marketAnalysis',
    'userPersonas',
    'features',
    'architecture',
    'timeline',
    'successMetrics',
    'risks',
    'techStack',
  ],
};
