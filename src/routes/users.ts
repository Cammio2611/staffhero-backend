import express from 'express';
import { updateAvailability, updateCompliance, getUserProfile } from '../controllers/userController';
import { authenticateStaff } from '../middleware/auth';

const router = express.Router();

router.post('/availability', authenticateStaff, updateAvailability);
router.post('/compliance', authenticateStaff, updateCompliance);
router.get('/profile', authenticateStaff, getUserProfile);

export default router;
