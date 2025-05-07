// src/controllers/uploadController.ts

import { Request, Response } from 'express';
import User from '../models/User';
import { sectorRequirements } from '../config/sectorRequirements';

// Tell TypeScript what sectors are valid
type Sector = keyof typeof sectorRequirements;

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { userId, documentName, sector } = req.body;

    if (!userId || !documentName || !sector) {
      return res.status(400).json({ message: 'Missing fields: userId, documentName, and sector are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Safely assert that sector is a valid key
    const safeSector = sector as Sector;
    const requirements = sectorRequirements[safeSector] || [];

    // Find the document info (like mandatory flag and expiry rule)
    const matchingRequirement = requirements.find(req => req.name === documentName);

    // Determine expiry date based on sector rule (default to 12 months if not specified)
    const monthsValid = matchingRequirement?.expiresAfterMonths || 12;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + monthsValid);

    // Push the new document into user's requiredDocuments
    user.requiredDocuments.push({
      name: documentName,
      mandatory: matchingRequirement?.mandatory ?? true,
      uploaded: true,
      verified: false,
      fileUrl: req.file?.path,
      uploadDate: new Date(),
      expiryDate: expiryDate,
    });

    await user.save();

    res.json({ message: 'Document uploaded successfully', documents: user.requiredDocuments });
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
