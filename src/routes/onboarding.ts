// src/routes/onboarding.ts

import express from 'express';
import { sendOnboardingEmail } from '../controllers/onboardingController';

const router = express.Router();

// POST /api/onboarding/send
router.post('/send', sendOnboardingEmail);

export default router;
