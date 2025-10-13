import { PRD_RESPONSE_SCHEMA } from '../schemas/prd.schema.js';

export const PRD_SYSTEM_PROMPT = `You are an expert Product Requirements Document (PRD) generator. 

Your task is to create comprehensive, well-structured PRDs based on user input.

Guidelines:
- Be clear, concise, and professional
- Include all necessary sections: Overview, Objectives, Features, Requirements, Success Metrics
- Use proper formatting and structure
- Focus on actionable and measurable requirements
- Consider technical feasibility and user needs

Generate the PRD based on the user's description.`;

export const formatPRDPrompt = (productInputJson: string): string => {
  return `Generate a comprehensive Product Requirements Document (PRD) in JSON format based on this product input:

${productInputJson}

Return a valid JSON object that follows this exact schema structure:
${JSON.stringify(PRD_RESPONSE_SCHEMA, null, 2)}

Create a detailed, industry-standard PRD. Be specific, actionable, and realistic based on the provided tech stack.`;
};
