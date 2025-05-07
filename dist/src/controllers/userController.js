"use strict";
// src/controllers/userController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.updateAvailability = exports.updateCompliance = void 0;
const User_1 = __importDefault(require("../models/User"));
// Update compliance status
const updateCompliance = async (req, res) => {
    try {
        const { userId, isCompliant } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isCompliant = isCompliant;
        await user.save();
        res.json({ message: 'Compliance status updated', user });
    }
    catch (error) {
        console.error('Error updating compliance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateCompliance = updateCompliance;
// Update availability
const updateAvailability = async (req, res) => {
    try {
        const { userId, availability } = req.body;
        if (!userId || !availability) {
            return res.status(400).json({ message: 'userId and availability are required' });
        }
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.availability = availability;
        await user.save();
        res.json({ message: 'Availability updated', availability: user.availability });
    }
    catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateAvailability = updateAvailability;
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllUsers = getAllUsers;
