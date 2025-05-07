"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateCandidate = void 0;
const User_1 = __importDefault(require("../models/User"));
const rateCandidate = async (req, res) => {
    try {
        const { workerId, clientId, rating } = req.body;
        if (!workerId || !clientId || rating == null) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        const worker = await User_1.default.findById(workerId);
        if (!worker)
            return res.status(404).json({ message: 'Worker not found' });
        worker.ratings.push({ clientId, rating });
        if (rating >= 4 && !worker.favoriteClients.includes(clientId)) {
            worker.favoriteClients.push(clientId);
        }
        await worker.save();
        res.json({ message: 'Rating submitted successfully' });
    }
    catch (error) {
        console.error('Rating error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.rateCandidate = rateCandidate;
