// routes/users.ts
import express from 'express';
import {
  updateAvailability,
  updateCompliance,
  getUserProfile
} from '../controllers/userController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.get('/profile', authenticateStaff, getUserProfile);
router.put('/availability', authenticateStaff, updateAvailability);
router.put('/compliance', authenticateStaff, updateCompliance);

export default router;