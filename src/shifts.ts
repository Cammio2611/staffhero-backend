import express from "express";
import Shift from "../models/Shift";
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const requireCompliance = async (req: Request, res: Response, next: NextFunction) => {
  // your logic
};

// GET all shifts
router.get("/", async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shifts", error: err });
  }
});

// POST create a new shift
router.post("/", async (req, res) => {
  try {
    const newShift = new Shift(req.body);
    await newShift.save();
    res.status(201).json(newShift);
  } catch (err) {
    res.status(400).json({ message: "Failed to create shift", error: err });
  }
});

// PATCH book a shift
router.patch("/:id/book", async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      { booked: true, bookedBy: req.body.bookedBy, status: "booked" },
      { new: true }
    );
    res.json(shift);
  } catch (err) {
    res.status(400).json({ message: "Failed to book shift", error: err });
  }
});

// PATCH cancel a shift
router.patch("/:id/cancel", async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      { booked: false, bookedBy: null, status: "cancelled" },
      { new: true }
    );
    res.json(shift);
  } catch (err) {
    res.status(400).json({ message: "Failed to cancel shift", error: err });
  }
});

// PATCH complete a shift
router.patch("/:id/complete", async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    res.json(shift);
  } catch (err) {
    res.status(400).json({ message: "Failed to complete shift", error: err });
  }
});

export default router;
