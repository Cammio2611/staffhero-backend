import { Request, Response } from "express";
import Shift from "../models/Shift";

export const getShifts = async (_req: Request, res: Response): Promise<Response> => {
  const shifts = await Shift.find();
  return res.json(shifts);
};
