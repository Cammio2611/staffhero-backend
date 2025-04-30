import express, { Request, Response } from 'express';
import Shift from '../models/Shift';
import mongoose from 'mongoose';
import { startOfWeek, endOfWeek } from 'date-fns';

const router = express.Router();

// Get ALL shifts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Book a shift
router.post('/:id/book', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid shift ID' });
    }

    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    if (shift.status === 'booked') {
      return res.status(400).json({ message: 'Shift already booked' });
    }

    shift.bookedBy = userId;
    shift.status = 'booked';

    await shift.save();
    res.json({ message: 'Shift booked successfully', shift });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get shifts THIS WEEK
router.get('/this-week', async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

    const shifts = await Shift.find({
      date: { $gte: start, $lte: end }
    });

    res.json(shifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
