import type { Types } from "mongoose";
import { AuditLog } from "../models/AuditLog";

type WriteAuditInput = {
  action: string;
  entityType: string;
  entityId?: Types.ObjectId | string;
  adminId?: Types.ObjectId | string;
  metadata?: Record<string, unknown>;
};

export async function writeAudit(input: WriteAuditInput): Promise<void> {
  try {
    await AuditLog.create({
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      adminId: input.adminId,
      metadata: input.metadata ?? {},
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("[quadrick] failed to write audit log", err);
  }
}
