"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Shift_1 = __importDefault(require("../models/Shift"));
const Compliance_1 = __importDefault(require("../models/Compliance"));
const Review_1 = __importDefault(require("../models/Review"));
const Notification_1 = __importDefault(require("../models/Notification"));
const router = express_1.default.Router();
router.get("/dashboard", auth_1.authenticateStaff, async (req, res) => {
    try {
        const userId = req.user?.id;
        const upcomingShifts = await Shift_1.default.find({
            bookedBy: userId,
            date: { $gte: new Date() },
        }).sort({ date: 1 });
        const complianceDocs = await Compliance_1.default.find({ user: userId });
        const missing = complianceDocs.filter((doc) => doc.status === "missing");
        const expiringSoon = complianceDocs.filter((doc) => {
            const daysLeft = (new Date(doc.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return daysLeft <= 30 && daysLeft >= 0;
        });
        const recentReviews = await Review_1.default.find({ staffId: userId }).sort({ createdAt: -1 }).limit(5);
        const notifications = await Notification_1.default.find({ userId }).sort({ createdAt: -1 }).limit(10);
        res.json({
            upcomingShifts,
            complianceStatus: { missing, expiringSoon },
            recentReviews,
            notifications,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
