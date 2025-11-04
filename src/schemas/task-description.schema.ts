export const TASK_DESCRIPTION_DETAILED_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    overview: {
      type: 'string',
      description: 'Brief overview of the task (2-3 sentences)',
    },
    detailedDescription: {
      type: 'string',
      description:
        'Comprehensive description of the task and what needs to be accomplished',
    },
    technicalSteps: {
      type: 'array',
      items: { type: 'string' },
      description: 'Step-by-step technical implementation approach',
    },
    acceptanceCriteria: {
      type: 'array',
      items: { type: 'string' },
      description:
        'List of acceptance criteria that must be met for task completion',
    },
    testingRequirements: {
      type: 'array',
      items: { type: 'string' },
      description: 'Testing requirements and test cases needed',
    },
    dependencies: {
      type: 'array',
      items: { type: 'string' },
      description: 'List of dependencies, prerequisites, or related tasks',
    },
    deliverables: {
      type: 'array',
      items: { type: 'string' },
      description: 'Expected deliverables and outputs from this task',
    },
    risks: {
      type: 'array',
      items: { type: 'string' },
      description: 'Potential risks and challenges associated with the task',
    },
    estimatedEffort: {
      type: 'string',
      description: 'Estimated effort or time required (optional)',
    },
    notes: {
      type: 'string',
      description:
        'Additional notes, considerations, or constraints (optional)',
    },
    userStory: {
      type: 'string',
      description:
        'User story in format: "As a [user], I want [goal] so that [benefit]" (optional)',
    },
  },
  required: [
    'overview',
    'detailedDescription',
    'technicalSteps',
    'acceptanceCriteria',
    'testingRequirements',
    'dependencies',
    'deliverables',
    'risks',
    'estimatedEffort',
    'notes',
    'userStory',
  ],
};
