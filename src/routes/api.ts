import { Router } from 'express';

import { healthController } from '@/controllers/health.Controller.js';
import aiRouter from '@/routes/ai.routes.js';

const router = Router();

// Health check route
router.get('/health', healthController);

// AI routes
router.use('/ai', aiRouter);

export default router;
