import express from 'express';
import Notification from '../models/Notification';
import { sendNotification } from '../server';

const router = express.Router();

// ✅ Get notifications (with optional unread filter)
router.get('/', async (req, res) => {
  try {
    const { userId, unread, page = 1, limit = 10 } = req.query;

    const query: any = { userId };
    if (unread === 'true') query.read = false;

    const notifications = await Notification.find(query)
      .sort({ timestamp: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Notification.countDocuments(query);

    res.json({ notifications, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// ✅ Mark notification as read
router.put('/mark-read/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// ✅ Request upload notification (admin → staff)
router.post('/request-upload', async (req, res) => {
  const { userId, documentName } = req.body;

  if (!userId || !documentName) {
    return res.status(400).json({ error: 'Missing userId or documentName' });
  }

  const message = `📄 Please upload a fresh copy of '${documentName}' — it's expiring!`;

  const notification = await Notification.create({
    userId,
    message,
    target: 'staff',
  });

  sendNotification(userId, message);

  res.json({ success: true });
});

export default router;