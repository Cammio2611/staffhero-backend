import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Shift from "../src/models/Shift";
import Review from "../src/models/Review";
import Notification from "../src/models/Notification";
import Compliance from "../src/models/Compliance";
import User from "../src/models/User";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const user = await User.findOne({ email: "test@staffhero.com" });
    if (!user) throw new Error("Test user not found. Please register first.");

    console.log("✅ Seeding data for:", user.email);

    // Clear old test data
    await Shift.deleteMany({ bookedBy: user._id });
    await Review.deleteMany({ staffId: user._id });
    await Notification.deleteMany({ userId: user._id });
    await Compliance.deleteMany({ user: user._id });

    // Shifts
    await Shift.insertMany([
      { date: new Date(Date.now() + 2 * 86400000), location: "Greenwich Hospital", role: "HCA", bookedBy: user._id },
      { date: new Date(Date.now() + 4 * 86400000), location: "Tower View Care Home", role: "HCA", bookedBy: user._id },
    ]);

    // Compliance
    await Compliance.insertMany([
      { name: "DBS", status: "missing", user: user._id },
      { name: "Manual Handling", status: "valid", expiryDate: new Date(Date.now() + 20 * 86400000), user: user._id },
    ]);

    // Reviews
    await Review.insertMany([
      { staffId: user._id, clientName: "Bluebird Care", rating: 4, comment: "Punctual and caring." },
      { staffId: user._id, clientName: "NHS Trust", rating: 5, comment: "Excellent communicator." },
    ]);

    // Notifications
    await Notification.insertMany([
      { userId: user._id, message: "Shift reminder: Greenwich Hospital in 2 days." },
      { userId: user._id, message: "Your Manual Handling cert expires soon." },
    ]);

    console.log("✅ Seeded test data successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();