// routes/onboarding.ts
import express from 'express';
import { completeOnboarding } from '../controllers/userController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.post('/complete', authenticateStaff, completeOnboarding);

export default router;