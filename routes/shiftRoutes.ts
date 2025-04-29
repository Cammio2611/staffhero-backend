import express from 'express';
import Shift from '../models/Shift';
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json(shift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/staff/:id', async (req, res) => {
  const shifts = await Shift.find({ staffId: req.params.id });
  res.json(shifts);
});

export default router;