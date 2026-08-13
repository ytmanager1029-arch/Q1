import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { User } from "../models/User";

const ROUNDS = 12;

export async function seedAdminIfNeeded(): Promise<void> {
  const email = env.ADMIN_EMAIL.trim().toLowerCase();
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    const count = await User.countDocuments();
    if (count === 0) {
      console.warn(
        "[quadrick] no admin users exist. Set ADMIN_EMAIL and ADMIN_PASSWORD to seed one.",
      );
    }
    return;
  }

  if (password.length < 12) {
    console.warn("[quadrick] ADMIN_PASSWORD must be at least 12 characters. Skipping seed.");
    return;
  }

  const existing = await User.findOne({ email });
  if (existing && !env.ADMIN_RESET) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, ROUNDS);

  if (existing && env.ADMIN_RESET) {
    existing.passwordHash = passwordHash;
    existing.failedLoginAttempts = 0;
    existing.lockedUntil = undefined;
    await existing.save();
    console.log(`[quadrick] admin password reset for ${email}`);
    return;
  }

  await User.create({ email, passwordHash, role: "admin" });
  console.log(`[quadrick] seeded admin ${email}`);
}
