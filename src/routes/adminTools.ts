import express, { Request, Response } from "express";
import Shift from "../models/Shift";
import Review from "../models/Review";
import Notification from "../models/Notification";
import Compliance from "../models/Compliance";
import User from "../models/User";

const router = express.Router();

// POST /api/admin/seed
router.post("/seed", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: "test@staffhero.com" });
    if (!user) return res.status(404).json({ error: "Test user not found" });

    await Shift.insertMany([
      { date: new Date(Date.now() + 2 * 86400000), location: "Greenwich Hospital", role: "HCA", bookedBy: user._id },
      { date: new Date(Date.now() + 4 * 86400000), location: "Tower View Care Home", role: "HCA", bookedBy: user._id },
    ]);

    await Compliance.insertMany([
      { name: "DBS", status: "missing", user: user._id },
      { name: "Manual Handling", status: "valid", expiryDate: new Date(Date.now() + 20 * 86400000), user: user._id },
    ]);

    await Review.insertMany([
      { staffId: user._id, clientName: "Bluebird Care", rating: 4, comment: "Punctual and caring." },
      { staffId: user._id, clientName: "NHS Trust", rating: 5, comment: "Excellent communicator." },
    ]);

    await Notification.insertMany([
      { userId: user._id, message: "Shift reminder: Greenwich Hospital in 2 days." },
      { userId: user._id, message: "Your Manual Handling cert expires soon." },
    ]);

    res.json({ message: "Seeded test data." });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Seeding failed." });
  }
});

// DELETE /api/admin/seed
router.delete("/seed", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: "test@staffhero.com" });
    if (!user) return res.status(404).json({ error: "Test user not found" });

    await Shift.deleteMany({ bookedBy: user._id });
    await Compliance.deleteMany({ user: user._id });
    await Review.deleteMany({ staffId: user._id });
    await Notification.deleteMany({ userId: user._id });

    res.json({ message: "Test data cleared." });
  } catch (err) {
    console.error("Clear error:", err);
    res.status(500).json({ error: "Failed to clear seed data." });
  }
});

export default router;