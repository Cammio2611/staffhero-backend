"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookShift = void 0;
const Shift_1 = __importDefault(require("../models/Shift"));
const User_1 = __importDefault(require("../models/User"));
const bookShift = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId; // Assume frontend passes userId in body (or use req.user from token later)
        const shift = await Shift_1.default.findById(id);
        if (!shift) {
            return res.status(404).json({ message: "Shift not found" });
        }
        if (shift.status !== 'open') {
            return res.status(400).json({ message: "Shift is not available for booking" });
        }
        // 👀 If it's a PRIVATE shift (assignedWorkerId is set)
        if (shift.assignedWorkerId && shift.assignedWorkerId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to book this shift" });
        }
        // 📋 Check if user is compliant (optional)
        const user = await User_1.default.findById(userId);
        if (!user || !user.isCompliant) {
            return res.status(403).json({ message: "User is not compliant to book shifts" });
        }
        // 📝 Book the shift
        shift.bookedBy = userId;
        shift.status = 'booked';
        await shift.save();
        res.json({ message: "Shift booked successfully", shift });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.bookShift = bookShift;
