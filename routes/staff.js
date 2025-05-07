const express = require('express');
const router = express.Router();
const { authenticateStaff } = require('../middleware/auth');
const Shift = require('../models/Shift');
const Compliance = require('../models/Compliance');
const Review = require('../models/Review');
const Notification = require('../models/Notification');

// Staff Dashboard
router.get('/dashboard', authenticateStaff, async (req, res) => {
  try {
    const upcomingShifts = await Shift.find({
      bookedBy: req.user.id,
      date: { $gte: new Date() }
    }).sort({ date: 1 });

    const complianceDocs = await Compliance.find({ user: req.user.id });
    const missing = complianceDocs.filter(doc => doc.status === 'missing');
    const expiringSoon = complianceDocs.filter(doc => {
      const daysLeft = (new Date(doc.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
      return daysLeft <= 30 && daysLeft >= 0;
    });

    const recentReviews = await Review.find({ staffId: req.user.id }).sort({ createdAt: -1 }).limit(5);

    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10);

    res.json({
      upcomingShifts,
      complianceStatus: {
        missing,
        expiringSoon
      },
      recentReviews,
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
