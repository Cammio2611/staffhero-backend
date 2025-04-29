// src/controllers/userController.ts

import { Request, Response } from 'express';
import User from '../models/User';

// Update compliance status
export const updateCompliance = async (req: Request, res: Response) => {
  try {
    const { userId, isCompliant } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isCompliant = isCompliant;
    await user.save();

    res.json({ message: 'Compliance status updated', user });
  } catch (error) {
    console.error('Error updating compliance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update availability
export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { userId, availability } = req.body;

    if (!userId || !availability) {
      return res.status(400).json({ message: 'userId and availability are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.availability = availability;
    await user.save();

    res.json({ message: 'Availability updated', availability: user.availability });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
