import express from 'express';
import { seedUsers, clearUsers, listUsers } from '../controllers/adminController';
import { authenticateToken, verifyAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/seed', authenticateToken, verifyAdmin, seedUsers);
router.delete('/clear', authenticateToken, verifyAdmin, clearUsers);
router.get('/list', authenticateToken, verifyAdmin, listUsers);

export default router;
