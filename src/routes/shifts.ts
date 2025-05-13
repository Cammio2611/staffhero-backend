import express from 'express';
import { getAvailableShifts, bookShift, cancelShift, getShifts } from '../controllers/shiftController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.get('/available', authenticateStaff, getAvailableShifts);
router.post('/book', authenticateStaff, bookShift);
router.post('/cancel', authenticateStaff, cancelShift);
router.get('/my-shifts', authenticateStaff, getShifts);

export default router;
