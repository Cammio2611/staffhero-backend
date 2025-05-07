import { Request } from "express";

export interface DecodedUser {
  id: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedUser;
}