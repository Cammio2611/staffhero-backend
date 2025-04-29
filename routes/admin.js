const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const Shift = require('../models/Shift');
const Compliance = require('../models/Compliance');
const Review = require('../models/Review');
const Notification = require('../models/Notification');

// Admin Dashboard
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const totalShifts = await Shift.countDocuments();
    const filledShifts = await Shift.countDocuments({ status: 'filled' });
    const unfilledShifts = totalShifts - filledShifts;

    const pendingCompliance = await Compliance.countDocuments({ status: 'pending' });
    const pendingReviews = await Review.countDocuments({ status: 'pending' });

    const notifications = await Notification.find({ target: 'admin' }).sort({ createdAt: -1 }).limit(10);

    res.json({
      totalShifts,
      filledShifts,
      unfilledShifts,
      pendingCompliance,
      pendingReviews,
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
