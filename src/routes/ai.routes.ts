import { Router } from 'express';

import {
  generatePRD,
  generateProjectDescription,
} from '@/controllers/ai.controller.js';
import { asyncHandler } from '@/utils/asyncHandler.js';

const router = Router();

router.post('/generate-prd', asyncHandler(generatePRD));
router.post(
  '/generate-project-description',
  asyncHandler(generateProjectDescription)
);

export default router;
