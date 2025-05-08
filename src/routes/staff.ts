import express, { Response } from "express";
import multer from "multer";
import streamifier from "streamifier";

import { authenticateStaff } from "../middleware/auth";
import { AuthenticatedRequest } from "../types/express";
import cloudinary from "../utils/cloudinary";

import Shift from "../models/Shift";
import Compliance from "../models/Compliance";
import Review from "../models/Review";
import Notification from "../models/Notification";
import User from "../models/User";

const router = express.Router();
const upload = multer(); // memory storage

// ✅ GET /api/staff/dashboard
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

// ✅ POST /api/staff/profile-photo (upload image to Cloudinary)
router.post("/profile-photo", authenticateStaff, upload.single("avatar"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const streamUpload = () =>
      new Promise<{ url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "staffhero-profile-photos",
            allowed_formats: ["jpg", "jpeg", "png"],
            transformation: [{ width: 300, height: 300, crop: "fill" }],
          },
          (error, result) => {
            if (result?.secure_url) resolve({ url: result.secure_url });
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { profilePhoto: result.url },
      { new: true }
    );

    res.json({
      message: "Profile photo updated",
      profilePhoto: updatedUser?.profilePhoto,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Failed to upload profile photo." });
  }
});

export default router;
