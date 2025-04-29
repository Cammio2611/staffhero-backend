import express from 'express';
import Timesheet from '../models/Timesheet';
const router = express.Router();

router.post('/submit', async (req, res) => {
  const timesheet = await Timesheet.create(req.body);
  res.status(201).json(timesheet);
});

router.get('/shift/:shiftId', async (req, res) => {
  const timesheet = await Timesheet.findOne({ shiftId: req.params.shiftId });
  res.json(timesheet);
});

export default router;