import express from 'express';
import {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  deleteShift,
} from '../controllers/shiftController';

const router = express.Router();

// Route: GET /api/shifts
router.get('/', getAllShifts);

// Route: GET /api/shifts/:id
router.get('/:id', getShiftById);

// Route: POST /api/shifts
router.post('/', createShift);

// Route: PUT /api/shifts/:id
router.put('/:id', updateShift);

// Route: DELETE /api/shifts/:id
router.delete('/:id', deleteShift);

export default router;
