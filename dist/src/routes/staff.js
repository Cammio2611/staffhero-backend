"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier"));
const auth_1 = require("../middleware/auth");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const Shift_1 = __importDefault(require("../models/Shift"));
const Compliance_1 = __importDefault(require("../models/Compliance"));
const Review_1 = __importDefault(require("../models/Review"));
const Notification_1 = __importDefault(require("../models/Notification"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)(); // memory storage
// ✅ GET /api/staff/dashboard
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
// ✅ POST /api/staff/profile-photo (upload image to Cloudinary)
router.post("/profile-photo", auth_1.authenticateStaff, upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }
        const streamUpload = () => new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({
                folder: "staffhero-profile-photos",
                allowed_formats: ["jpg", "jpeg", "png"],
                transformation: [{ width: 300, height: 300, crop: "fill" }],
            }, (error, result) => {
                if (result?.secure_url)
                    resolve({ url: result.secure_url });
                else
                    reject(error);
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(stream); // ✅ Use non-null assertion
        });
        const result = await streamUpload();
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user?.id, { profilePhoto: result.url }, { new: true });
        res.json({
            message: "Profile photo updated",
            profilePhoto: updatedUser?.profilePhoto,
        });
    }
    catch (err) {
        console.error("❌ Upload error:", err);
        res.status(500).json({ error: "Failed to upload profile photo." });
    }
});
exports.default = router;
