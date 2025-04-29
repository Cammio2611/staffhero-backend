import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Compliance from '../src/models/Compliance';
import Notification from '../src/models/Notification';
import { sendNotification } from '../src/server';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

export async function checkComplianceExpiry() {
  await mongoose.connect(MONGO_URI);
  console.log('🧪 Connected to MongoDB for compliance check');

  const now = new Date();
  const warningThreshold = 30; // days

  const documents = await Compliance.find({ expiryDate: { $exists: true } }).populate('userId');

  for (const doc of documents) {
    const { expiryDate, userId, name, status } = doc;
    if (!expiryDate || !userId) continue;

    const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let message = '';
    if (daysLeft < 0 && status !== 'expired') {
      doc.status = 'expired';
      message = `❌ Your document '${name}' has expired.`;
    } else if (daysLeft <= warningThreshold && status === 'compliant') {
      doc.status = 'expiring';
      message = `⏳ Your document '${name}' is expiring in ${daysLeft} days.`;
    }

    if (message) {
      await doc.save();

      const notification = await Notification.create({
        userId,
        message,
        target: 'staff',
      });

      sendNotification(String(userId), message);
      console.log(`📢 Notified ${userId}: ${message}`);
    }
  }

  await mongoose.disconnect();
  console.log('✅ Compliance check complete.');
}
