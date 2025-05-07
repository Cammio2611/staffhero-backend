import express, { RequestHandler } from 'express';
import { rateCandidate } from '../controllers/ratingController';

const router = express.Router();

router.post('/', rateCandidate as RequestHandler);

export default router;
