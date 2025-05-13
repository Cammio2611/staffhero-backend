// routes/admin.ts
import express from 'express';
import {
  seedUsers,
  clearUsers,
  listAllUsers
} from '../controllers/adminController';

const router = express.Router();

router.post('/seed', seedUsers);
router.delete('/clear', clearUsers);
router.get('/users', listAllUsers);

export default router;