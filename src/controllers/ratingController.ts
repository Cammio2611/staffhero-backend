import { Request, Response } from "express";

export const submitRating = async (req: Request, res: Response): Promise<Response> => {
  const { rating } = req.body;
  if (!rating) {
    return res.status(400).json({ error: "Rating is required." });
  }

  // Save rating logic here

  return res.json({ message: "Rating submitted successfully." });
};
