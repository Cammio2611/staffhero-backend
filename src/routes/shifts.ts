import express, { RequestHandler } from 'express';
import Shift from '../models/Shift';

const router = express.Router();

router.get('/', (async (req, res) => {
  const shifts = await Shift.find();
  res.json(shifts);
}) as RequestHandler);

router.post('/:id/book', (async (req, res) => {
  const shift = await Shift.findByIdAndUpdate(
    req.params.id,
    { booked: true, bookedBy: req.body.bookedBy, status: 'booked' },
    { new: true }
  );
  res.json(shift);
}) as RequestHandler);

router.patch('/:id/cancel', (async (req, res) => {
  const shift = await Shift.findByIdAndUpdate(
    req.params.id,
    { booked: false, bookedBy: null, status: 'cancelled' },
    { new: true }
  );
  res.json(shift);
}) as RequestHandler);

router.patch('/:id/complete', (async (req, res) => {
  const shift = await Shift.findByIdAndUpdate(
    req.params.id,
    { status: 'completed' },
    { new: true }
  );
  res.json(shift);
}) as RequestHandler);

export default router;
