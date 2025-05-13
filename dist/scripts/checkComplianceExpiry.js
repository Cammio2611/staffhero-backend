"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkComplianceExpiry = checkComplianceExpiry;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Compliance_1 = __importDefault(require("../src/models/Compliance"));
const Notification_1 = __importDefault(require("../src/models/Notification"));
const server_1 = require("../src/server");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || '';
async function checkComplianceExpiry() {
    await mongoose_1.default.connect(MONGO_URI);
    console.log('🧪 Connected to MongoDB for compliance check');
    const now = new Date();
    const warningThreshold = 30; // days
    const documents = await Compliance_1.default.find({ expiryDate: { $exists: true } }).populate('userId');
    for (const doc of documents) {
        const { expiryDate, userId, name, status } = doc;
        if (!expiryDate || !userId)
            continue;
        const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        let message = '';
        if (daysLeft < 0 && status !== 'expired') {
            doc.status = 'expired';
            message = `❌ Your document '${name}' has expired.`;
        }
        else if (daysLeft <= warningThreshold && status === 'compliant') {
            doc.status = 'expiring';
            message = `⏳ Your document '${name}' is expiring in ${daysLeft} days.`;
        }
        if (message) {
            await doc.save();
            const notification = await Notification_1.default.create({
                userId,
                message,
                target: 'staff',
            });
            (0, server_1.sendNotification)(String(userId), message);
            console.log(`📢 Notified ${userId}: ${message}`);
        }
    }
    await mongoose_1.default.disconnect();
    console.log('✅ Compliance check complete.');
}
