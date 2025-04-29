import express from 'express';
import Message from '../models/Message';

const router = express.Router();

// Send a message
router.post('/', async (req, res) => {
  const { sender, receiver, content } = req.body;
  try {
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Get all messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

export default router;
