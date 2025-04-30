import { Request, Response } from 'express';
import User from '../models/User';

export const getUserComplianceStatus = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const complianceData = users.map(user => {
      const missingDocs = user.requiredDocuments
        .filter(doc => doc.mandatory && (!doc.uploaded || (doc.expiryDate && new Date(doc.expiryDate) < new Date())))
        .map(doc => ({
          name: doc.name,
          expired: doc.expiryDate ? new Date(doc.expiryDate) < new Date() : false,
        }));

      return {
        id: user._id,
        email: user.email,
        role: user.role,
        isCompliant: user.isCompliant,
        missingDocuments: missingDocs,
      };
    });

    res.json(complianceData);
  } catch (error) {
    console.error('Error fetching user compliance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
