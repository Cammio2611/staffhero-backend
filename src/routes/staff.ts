import express from "express";
import { Response } from "express";
import { authenticateStaff } from "../middleware/auth";
import { AuthenticatedRequest } from "../types/express";
import Shift from "../models/Shift";
import Compliance from "../models/Compliance";
import Review from "../models/Review";
import Notification from "../models/Notification";
import User from "../models/User";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const router = express.Router();

// ✅ Setup Cloudinary for profile photo upload
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "staffhero-profile-photos",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
});
const upload = multer({ storage });

router.get("/dashboard", authenticateStaff, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const upcomingShifts = await Shift.find({
      bookedBy: userId,
      date: { $gte: new Date() },
    }).sort({ date: 1 });

    const complianceDocs = await Compliance.find({ user: userId });
    const missing = complianceDocs.filter((doc: any) => doc.status === "missing");
    const expiringSoon = complianceDocs.filter((doc: any) => {
      const daysLeft = (new Date(doc.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return daysLeft <= 30 && daysLeft >= 0;
    });

    const recentReviews = await Review.find({ staffId: userId }).sort({ createdAt: -1 }).limit(5);
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(10);

    res.json({
      upcomingShifts,
      complianceStatus: { missing, expiringSoon },
      recentReviews,
      notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Profile photo upload to Cloudinary
router.post("/profile-photo", authenticateStaff, upload.single("avatar"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const updated = await User.findByIdAndUpdate(
      req.user?.id,
      { profilePhoto: req.file?.path },
      { new: true }
    );

    res.json({ message: "Profile photo updated", profilePhoto: updated?.profilePhoto });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Failed to upload profile photo." });
  }
});

export default router;
