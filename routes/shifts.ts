import express from 'express';
import Shift from '../models/Shift';

const router = express.Router();

// GET /api/shifts?status=available&date=2025-04-30&page=1&limit=10
router.get('/', async (req, res) => {
  const { status, date, page = 1, limit = 10 } = req.query;
  const filter: any = {};

  if (status) filter.status = status;
  if (date) {
    const start = new Date(date as string);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  const shifts = await Shift.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort({ date: 1 });

  const count = await Shift.countDocuments(filter);

  res.json({ data: shifts, total: count });
});

// POST /api/shifts/:id/book
router.post('/:id/book', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    if (shift.status === 'booked') {
      return res.status(400).json({ message: 'Shift already booked' });
    }

    shift.status = 'booked';
    shift.bookedBy = userId;
    await shift.save();

    res.json({ message: 'Shift booked successfully', shift });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err });
  }
});

export default router;
