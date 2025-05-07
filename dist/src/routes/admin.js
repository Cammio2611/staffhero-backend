"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Shift_1 = __importDefault(require("../models/Shift"));
const Compliance_1 = __importDefault(require("../models/Compliance"));
const Review_1 = __importDefault(require("../models/Review"));
const Notification_1 = __importDefault(require("../models/Notification"));
const router = express_1.default.Router();
// ✅ Admin dashboard summary
router.get('/dashboard', async (req, res) => {
    try {
        const totalShifts = await Shift_1.default.countDocuments();
        const filledShifts = await Shift_1.default.countDocuments({ status: 'filled' });
        const unfilledShifts = totalShifts - filledShifts;
        const pendingCompliance = await Compliance_1.default.countDocuments({ status: 'pending' });
        const pendingReviews = await Review_1.default.countDocuments({ status: 'pending' });
        const notifications = await Notification_1.default.find({ target: 'admin' })
            .sort({ createdAt: -1 })
            .limit(10);
        const shiftsByDate = await Shift_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const complianceBreakdown = await Compliance_1.default.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        const expiringDocsCount = await Compliance_1.default.countDocuments({ status: 'expiring' });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ✅ Admin: List all expiring/expired compliance documents
router.get('/expiring-documents', async (req, res) => {
    try {
        const documents = await Compliance_1.default.find({
            status: { $in: ['expiring', 'expired'] }
        })
            .populate('userId', 'name email')
            .sort({ expiryDate: 1 });
        res.json(documents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
