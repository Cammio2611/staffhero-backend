import express, { RequestHandler } from 'express';
import { sendOnboardingEmail } from '../controllers/onboardingController';

const router = express.Router();

router.post('/send', sendOnboardingEmail as RequestHandler);

export default router;
