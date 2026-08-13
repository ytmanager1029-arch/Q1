import mongoose, { Schema } from "mongoose";
import { AuditLogs } from "../db/runtime";

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true, maxlength: 80, index: true },
    entityType: { type: String, required: true, maxlength: 40 },
    entityId: { type: Schema.Types.ObjectId },
    adminId: { type: Schema.Types.ObjectId, ref: "User" },
    metadata: { type: Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false },
);

auditLogSchema.index({ timestamp: -1, action: 1 });

export const AuditLogMongo = mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);

export const AuditLog = AuditLogs as any;
