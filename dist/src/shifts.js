"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Shift_1 = __importDefault(require("../models/Shift"));
const router = express_1.default.Router();
const requireCompliance = async (req, res, next) => {
    // your logic
};
// GET all shifts
router.get("/", async (req, res) => {
    try {
        const shifts = await Shift_1.default.find();
        res.json(shifts);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch shifts", error: err });
    }
});
// POST create a new shift
router.post("/", async (req, res) => {
    try {
        const newShift = new Shift_1.default(req.body);
        await newShift.save();
        res.status(201).json(newShift);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to create shift", error: err });
    }
});
// PATCH book a shift
router.patch("/:id/book", async (req, res) => {
    try {
        const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { booked: true, bookedBy: req.body.bookedBy, status: "booked" }, { new: true });
        res.json(shift);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to book shift", error: err });
    }
});
// PATCH cancel a shift
router.patch("/:id/cancel", async (req, res) => {
    try {
        const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { booked: false, bookedBy: null, status: "cancelled" }, { new: true });
        res.json(shift);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to cancel shift", error: err });
    }
});
// PATCH complete a shift
router.patch("/:id/complete", async (req, res) => {
    try {
        const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
        res.json(shift);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to complete shift", error: err });
    }
});
exports.default = router;
