import express from 'express';
import {
  startOnboarding,
  getOnboardingStatus,
  completeOnboarding,
} from '../controllers/onboardingController';

const router = express.Router();

router.post('/start', startOnboarding);
router.get('/:userId/status', getOnboardingStatus);
router.post('/:userId/complete', completeOnboarding);

export default router;
