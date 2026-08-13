import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { COOKIE_NAME } from "../utils/constants";
import { verifyToken } from "../utils/cookies";
import { asyncHandler } from "./asyncHandler";

export type AuthedRequest = Request & {
  admin?: {
    id: string;
    email: string;
    role: "admin";
  };
};

export const requireAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    throw new AppError(401, "Authentication required.");
  }

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).lean();
    if (!user || user.role !== "admin") {
      throw new AppError(401, "Authentication required.");
    }
    (req as AuthedRequest).admin = {
      id: String(user._id),
      email: user.email,
      role: "admin",
    };
    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(401, "Authentication required.");
  }
});
