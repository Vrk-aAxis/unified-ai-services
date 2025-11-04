import { TaskDescriptionInput } from '../interfaces/ai.interface.js';
import { TASK_DESCRIPTION_DETAILED_SCHEMA } from '../schemas/task-description.schema.js';

export const buildSimpleTaskDescriptionPrompt = (
  input: TaskDescriptionInput
): string => {
  const parts: string[] = [
    `Generate a clear, professional task description (2-3 paragraphs, around 150-200 words) for the following task:`,
    '',
    `Task Title: ${input.taskTitle}`,
    `Brief Description: ${input.briefDescription}`,
    `Project Context: ${input.projectContext}`,
  ];

  if (input.taskType) {
    parts.push(`Task Type: ${input.taskType}`);
  }

  if (input.priority) {
    parts.push(`Priority: ${input.priority}`);
  }

  parts.push(
    '',
    'The description should be comprehensive and include:',
    '- What needs to be accomplished',
    '- Why this task is important for the project',
    '- Key considerations or requirements',
    '',
    'Write in a professional tone suitable for a project management or task tracking system. Make it clear, actionable, and informative.'
  );

  return parts.join('\n');
};

export const buildDetailedTaskDescriptionPrompt = (
  input: TaskDescriptionInput
): string => {
  const parts: string[] = [
    `Generate a comprehensive task description in JSON format for the following task:`,
    '',
    `Task Title: ${input.taskTitle}`,
    `Brief Description: ${input.briefDescription}`,
    `Project Context: ${input.projectContext}`,
  ];

  if (input.projectDescription) {
    parts.push(`Project Description: ${input.projectDescription}`);
  }

  if (input.taskType) {
    parts.push(`Task Type: ${input.taskType}`);
  }

  if (input.priority) {
    parts.push(`Priority: ${input.priority}`);
  }

  if (input.estimatedEffort) {
    parts.push(`Estimated Effort: ${input.estimatedEffort}`);
  }

  if (input.technicalRequirements) {
    const techParts: string[] = ['Technical Requirements:'];
    if (input.technicalRequirements.techStack?.length) {
      techParts.push(
        `- Tech Stack: ${input.technicalRequirements.techStack.join(', ')}`
      );
    }
    if (input.technicalRequirements.frameworks?.length) {
      techParts.push(
        `- Frameworks: ${input.technicalRequirements.frameworks.join(', ')}`
      );
    }
    if (input.technicalRequirements.apis?.length) {
      techParts.push(`- APIs: ${input.technicalRequirements.apis.join(', ')}`);
    }
    parts.push(techParts.join('\n'));
  }

  if (input.acceptanceCriteria?.length) {
    parts.push(
      `Acceptance Criteria (provided): ${input.acceptanceCriteria.join(', ')}`
    );
  }

  if (input.dependencies?.length) {
    parts.push(`Dependencies: ${input.dependencies.join(', ')}`);
  }

  if (input.constraints) {
    parts.push(`Constraints: ${input.constraints}`);
  }

  parts.push(
    '',
    'Return a valid JSON object that follows this exact schema structure:',
    JSON.stringify(TASK_DESCRIPTION_DETAILED_SCHEMA, null, 2),
    '',
    'IMPORTANT: All fields in the schema are required. You must include ALL fields in your response:',
    '- overview: Brief overview (2-3 sentences)',
    '- detailedDescription: Comprehensive description',
    '- technicalSteps: Array of step-by-step technical implementation steps',
    '- acceptanceCriteria: Array of acceptance criteria (use provided ones if given, or generate comprehensive ones)',
    '- testingRequirements: Array of testing requirements',
    '- dependencies: Array of dependencies/prerequisites',
    '- deliverables: Array of expected deliverables',
    '- risks: Array of potential risks',
    '- estimatedEffort: Estimated effort (use provided value if given, or generate one, or empty string "")',
    '- notes: Additional notes/constraints (use provided constraints if given, or empty string "")',
    '- userStory: User story in format "As a [user], I want [goal] so that [benefit]" (or empty string "" if not applicable)',
    '',
    'Guidelines:',
    '- Make all content specific, actionable, and relevant to the task',
    '- Generate comprehensive, detailed information for all required fields',
    '- If a field doesn\'t have a value, use an empty string "" instead of omitting it'
  );

  return parts.join('\n');
};
