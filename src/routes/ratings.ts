import express from 'express';
import {
  getAllRatings,
  createRating,
} from '../controllers/ratingController';

const router = express.Router();

router.get('/', getAllRatings);
router.post('/', createRating);

export default router;
