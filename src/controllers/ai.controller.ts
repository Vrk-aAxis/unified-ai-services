import { Request, Response } from 'express';

import {
  AIProvider,
  GenerateResponse,
  ProductInput,
  ProjectDescriptionInput,
} from '../interfaces/ai.interface.js';
import { ApiError } from '../middleware/errorHandler.js';
import { AIFactory } from '../services/ai/ai.factory.js';
import { PRDGeneratorService } from '../services/prd-generator.service.js';
import { ProjectDescriptionGeneratorService } from '../services/project-description-generator.service.js';
import { logger } from '../utils/logger.js';

export const generatePRD = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productInput, provider = 'groq' } = req.body as {
    productInput: ProductInput;
    provider?: string;
  };

  if (!productInput) {
    throw new ApiError(400, 'Product input is required');
  }

  const aiProvider = provider.toLowerCase() as AIProvider;

  // Validate provider
  const supportedProviders = PRDGeneratorService.getSupportedProviders();
  if (!supportedProviders.includes(aiProvider)) {
    const providerInfo = supportedProviders
      .map((p) => {
        const info = PRDGeneratorService.getProviderInfo(p);
        return `${p} (${info.speed})`;
      })
      .join(', ');
    throw new ApiError(
      400,
      `Invalid provider. Supported providers: ${providerInfo}`
    );
  }

  try {
    logger.info(`Generating PRD with ${aiProvider}`);

    const data = await PRDGeneratorService.generate(productInput, aiProvider);
    const aiService = AIFactory.getService(aiProvider);

    const response: GenerateResponse = {
      provider: aiProvider,
      data,
      model: aiService.getModelName(),
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error('PRD generation failed', { error, provider: aiProvider });
    throw new ApiError(
      500,
      `Failed to generate PRD: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const generateProjectDescription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input = req.body as ProjectDescriptionInput;

  // Validate input
  if (
    !input.simplePrompt &&
    !input.projectName &&
    !input.category &&
    !input.purpose
  ) {
    throw new ApiError(
      400,
      'Either simplePrompt or structured fields (projectName, category, purpose) must be provided'
    );
  }

  const provider =
    (input.provider?.toLowerCase() as AIProvider) ?? AIProvider.GROQ;

  // Validate provider
  const supportedProviders =
    ProjectDescriptionGeneratorService.getSupportedProviders();
  if (!supportedProviders.includes(provider)) {
    const providerInfo = supportedProviders
      .map((p) => {
        const info = ProjectDescriptionGeneratorService.getProviderInfo(p);
        return `${p} (${info.speed})`;
      })
      .join(', ');
    throw new ApiError(
      400,
      `Invalid provider. Supported providers: ${providerInfo}`
    );
  }

  try {
    logger.info(`Generating project description with ${provider}`);

    const result = await ProjectDescriptionGeneratorService.generate(
      input,
      provider
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Project description generation failed', {
      error,
      provider,
    });
    throw new ApiError(
      500,
      `Failed to generate project description: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
