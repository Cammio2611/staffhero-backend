import { Request, Response } from 'express';

export const getAvailableShifts = async (req: Request, res: Response) => {
  res.json({ message: 'Get available shifts not yet implemented.' });
};

export const bookShift = async (req: Request, res: Response) => {
  res.json({ message: 'Book shift not yet implemented.' });
};

export const cancelShift = async (req: Request, res: Response) => {
  res.json({ message: 'Cancel shift not yet implemented.' });
};

export const getShifts = async (req: Request, res: Response) => {
  res.json({ message: 'Get my shifts not yet implemented.' });
};
