import { Request, Response } from "express";
import User from "../models/User";

export const listUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users = await User.find();
  return res.json(users);
};
