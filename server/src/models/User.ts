import mongoose, { Schema } from "mongoose";
import { Users } from "../db/runtime";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    lastLoginAt: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
  },
  { timestamps: true },
);

export const UserMongo = mongoose.models.User || mongoose.model("User", userSchema);

// Runtime collection (Mongo or local store). Typed loosely so both backends typecheck.
export const User = Users as any;
