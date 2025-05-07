"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../models/Message"));
const router = express_1.default.Router();
// Send a message
router.post('/', async (req, res) => {
    const { sender, receiver, content } = req.body;
    try {
        const message = new Message_1.default({ sender, receiver, content });
        await message.save();
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});
// Get all messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;
    try {
        const messages = await Message_1.default.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 },
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});
exports.default = router;
