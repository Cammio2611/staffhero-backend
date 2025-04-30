// backend/src/routes/ratings.ts
import express from 'express';
import { rateCandidate } from '../controllers/ratingController';

const router = express.Router();

router.post('/', rateCandidate);

export default router;
