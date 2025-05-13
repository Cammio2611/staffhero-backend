import express from 'express';
import { rateCandidate } from '../controllers/ratingController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.post('/rate', authenticateStaff, rateCandidate);

export default router;
