import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { User } from "../models/User";
import { writeAudit } from "../services/audit";
import { AUDIT_ACTIONS } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { clearSessionCookie, setSessionCookie, signToken } from "../utils/cookies";
import type { AuthedRequest } from "../middleware/auth";

const LOCK_AFTER = 8;
const LOCK_MS = 15 * 60 * 1000;
const GENERIC = "Invalid credentials.";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });

  if (!user) {
    await bcrypt.hash(password, 10);
    throw new AppError(401, GENERIC);
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    throw new AppError(401, GENERIC);
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    user.failedLoginAttempts = (user.failedLoginAttempts ?? 0) + 1;
    if (user.failedLoginAttempts >= LOCK_AFTER) {
      user.lockedUntil = new Date(Date.now() + LOCK_MS);
      user.failedLoginAttempts = 0;
    }
    await user.save();
    throw new AppError(401, GENERIC);
  }

  user.failedLoginAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken({
    sub: String(user._id),
    email: user.email,
    role: "admin",
  });
  setSessionCookie(res, token);

  await writeAudit({
    action: AUDIT_ACTIONS.LOGIN,
    entityType: "auth",
    entityId: user._id,
    adminId: user._id,
    metadata: { email: user.email },
  });

  res.json({
    user: {
      id: String(user._id),
      email: user.email,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
    },
  });
}

export async function logout(req: Request, res: Response) {
  const admin = (req as AuthedRequest).admin;
  clearSessionCookie(res);
  if (admin) {
    await writeAudit({
      action: AUDIT_ACTIONS.LOGOUT,
      entityType: "auth",
      entityId: admin.id,
      adminId: admin.id,
      metadata: { email: admin.email },
    });
  }
  res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  const admin = (req as AuthedRequest).admin;
  if (!admin) {
    throw new AppError(401, "Authentication required.");
  }
  const user = await User.findById(admin.id).lean();
  if (!user) {
    throw new AppError(401, "Authentication required.");
  }
  res.json({
    user: {
      id: String(user._id),
      email: user.email,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    },
  });
}

export async function changePassword(req: Request, res: Response) {
  const admin = (req as AuthedRequest).admin;
  if (!admin) throw new AppError(401, "Authentication required.");

  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };

  const user = await User.findById(admin.id);
  if (!user) throw new AppError(401, "Authentication required.");

  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) throw new AppError(400, "Current password is incorrect.");

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();

  await writeAudit({
    action: AUDIT_ACTIONS.PASSWORD_CHANGED,
    entityType: "auth",
    entityId: user._id,
    adminId: user._id,
  });

  res.json({ ok: true, message: "Password updated." });
}
