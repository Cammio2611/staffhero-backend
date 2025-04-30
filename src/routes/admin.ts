import express from 'express';
import { getDashboardStats, getRecentReviews } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', getDashboardStats);
router.get('/reviews', getRecentReviews);

export default router;
