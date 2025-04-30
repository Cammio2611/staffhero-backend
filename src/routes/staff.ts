import express from 'express';
import {
  getAllStaff,
  getStaffById,
  updateStaff,
} from '../controllers/staffController';

const router = express.Router();

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.put('/:id', updateStaff);

export default router;
