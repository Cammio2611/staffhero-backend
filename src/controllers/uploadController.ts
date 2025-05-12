import { Request, Response } from "express";

export const handleUpload = async (req: Request, res: Response): Promise<Response> => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  return res.json({ fileUrl: req.file.path });
};
