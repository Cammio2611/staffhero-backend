"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Shift_1 = __importDefault(require("../models/Shift"));
const router = express_1.default.Router();
router.get('/', (async (req, res) => {
    const shifts = await Shift_1.default.find();
    res.json(shifts);
}));
router.post('/:id/book', (async (req, res) => {
    const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { booked: true, bookedBy: req.body.bookedBy, status: 'booked' }, { new: true });
    res.json(shift);
}));
router.patch('/:id/cancel', (async (req, res) => {
    const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { booked: false, bookedBy: null, status: 'cancelled' }, { new: true });
    res.json(shift);
}));
router.patch('/:id/complete', (async (req, res) => {
    const shift = await Shift_1.default.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.json(shift);
}));
exports.default = router;
