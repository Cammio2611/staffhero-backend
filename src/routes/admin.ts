import express from 'express';
import { RequestHandler } from 'express';
import Shift from '../models/Shift';
import Compliance from '../models/Compliance';
import Review from '../models/Review';
import Notification from '../models/Notification';

const router = express.Router();

// ✅ Admin dashboard summary
router.get('/dashboard', async (req, res) => {
  try {
    const totalShifts = await Shift.countDocuments();
    const filledShifts = await Shift.countDocuments({ status: 'filled' });
    const unfilledShifts = totalShifts - filledShifts;

    const pendingCompliance = await Compliance.countDocuments({ status: 'pending' });
    const pendingReviews = await Review.countDocuments({ status: 'pending' });

    const notifications = await Notification.find({ target: 'admin' })
      .sort({ createdAt: -1 })
      .limit(10);

    const shiftsByDate = await Shift.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const complianceBreakdown = await Compliance.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const expiringDocsCount = await Compliance.countDocuments({ status: 'expiring' });

    res.json({
      totalShifts,
      filledShifts,
      unfilledShifts,
      pendingCompliance,
      pendingReviews,
      notifications,
      shiftsByDate,
      complianceBreakdown,
      expiringDocsCount,
      userId: 'admin-id-1'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Admin: List all expiring/expired compliance documents
router.get('/expiring-documents', async (req, res) => {
  try {
    const documents = await Compliance.find({
      status: { $in: ['expiring', 'expired'] }
    })
      .populate('userId', 'name email')
      .sort({ expiryDate: 1 });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;