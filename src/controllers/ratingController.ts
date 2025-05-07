// backend/src/controllers/ratingController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const rateCandidate = async (req: Request, res: Response) => {
  try {
    const { workerId, clientId, rating } = req.body;

    if (!workerId || !clientId || rating == null) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const worker = await User.findById(workerId);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    worker.ratings.push({ clientId, rating });

    if (rating >= 4 && !worker.favoriteClients.includes(clientId)) {
      worker.favoriteClients.push(clientId);
    }

    await worker.save();

    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
