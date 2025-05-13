// routes/shifts.ts
import express from 'express';
import {
  getAvailableShifts,
  bookShift,
  cancelShift,
  getMyShifts
} from '../controllers/shiftController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateStaff, getAvailableShifts);
router.post('/book/:id', authenticateStaff, bookShift);
router.post('/cancel/:id', authenticateStaff, cancelShift);
router.get('/my', authenticateStaff, getMyShifts);

export default router;