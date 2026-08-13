import type { Request, Response } from "express";
import { Inquiry } from "../models/Inquiry";
import { isHexId } from "../db/fileEngine";
import { AuditLog } from "../models/AuditLog";
import { writeAudit } from "../services/audit";
import { AUDIT_ACTIONS, PRIORITY_WEIGHT, type Priority } from "../utils/constants";
import { AppError } from "../utils/AppError";
import type { AuthedRequest } from "../middleware/auth";

function isUsableId(id: string) {
  return isHexId(id);
}

export async function listInquiries(req: Request, res: Response) {
  const { q, status, priority, projectType, from, to, sort, page, limit } = req.query as unknown as {
    q: string;
    status?: string;
    priority?: string;
    projectType?: string;
    from?: string;
    to?: string;
    sort: "newest" | "oldest" | "priority" | "updated";
    page: number;
    limit: number;
  };

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (projectType) filter.projectType = projectType;

  if (from || to) {
    const createdAt: Record<string, Date> = {};
    if (from) {
      const d = new Date(from);
      if (!Number.isNaN(d.getTime())) createdAt.$gte = d;
    }
    if (to) {
      const d = new Date(to);
      if (!Number.isNaN(d.getTime())) {
        d.setHours(23, 59, 59, 999);
        createdAt.$lte = d;
      }
    }
    if (Object.keys(createdAt).length) filter.createdAt = createdAt;
  }

  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }];
  }

  let sortSpec: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "oldest") sortSpec = { createdAt: 1 };
  if (sort === "updated") sortSpec = { updatedAt: -1 };

  const skip = (page - 1) * limit;

  if (sort === "priority") {
    const [items, total] = await Promise.all([
      Inquiry.find(filter).lean(),
      Inquiry.countDocuments(filter),
    ]);
    items.sort((a: { priority: string; createdAt: Date }, b: { priority: string; createdAt: Date }) => {
      const dw = PRIORITY_WEIGHT[b.priority as Priority] - PRIORITY_WEIGHT[a.priority as Priority];
      if (dw !== 0) return dw;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    res.json({
      items: items.slice(skip, skip + limit),
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
    return;
  }

  const [items, total] = await Promise.all([
    Inquiry.find(filter).sort(sortSpec).skip(skip).limit(limit).lean(),
    Inquiry.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
}

export async function getInquiry(req: Request, res: Response) {
  const { id } = req.params;
  if (!isUsableId(id)) throw new AppError(404, "Inquiry not found.");
  const inquiry = await Inquiry.findById(id).lean();
  if (!inquiry) throw new AppError(404, "Inquiry not found.");
  res.json({ inquiry });
}

export async function patchInquiry(req: Request, res: Response) {
  const admin = (req as AuthedRequest).admin;
  const { id } = req.params;
  if (!isUsableId(id)) throw new AppError(404, "Inquiry not found.");

  const inquiry = await Inquiry.findById(id);
  if (!inquiry) throw new AppError(404, "Inquiry not found.");

  const { priority, status } = req.body as { priority?: string; status?: string };
  const prev = { priority: inquiry.priority, status: inquiry.status };

  if (priority && priority !== inquiry.priority) {
    inquiry.priority = priority as typeof inquiry.priority;
    await writeAudit({
      action: AUDIT_ACTIONS.PRIORITY_CHANGED,
      entityType: "inquiry",
      entityId: inquiry._id,
      adminId: admin?.id,
      metadata: { from: prev.priority, to: priority, name: inquiry.name },
    });
  }

  if (status && status !== inquiry.status) {
    inquiry.status = status as typeof inquiry.status;
    await writeAudit({
      action: AUDIT_ACTIONS.STATUS_CHANGED,
      entityType: "inquiry",
      entityId: inquiry._id,
      adminId: admin?.id,
      metadata: { from: prev.status, to: status, name: inquiry.name },
    });
  }

  await inquiry.save();
  res.json({ inquiry });
}

export async function deleteInquiry(req: Request, res: Response) {
  const admin = (req as AuthedRequest).admin;
  const { id } = req.params;
  if (!isUsableId(id)) throw new AppError(404, "Inquiry not found.");

  const inquiry = await Inquiry.findById(id);
  if (!inquiry) throw new AppError(404, "Inquiry not found.");

  await inquiry.deleteOne();

  await writeAudit({
    action: AUDIT_ACTIONS.INQUIRY_DELETED,
    entityType: "inquiry",
    entityId: inquiry._id,
    adminId: admin?.id,
    metadata: {
      name: inquiry.name,
      email: inquiry.email,
      projectType: inquiry.projectType,
    },
  });

  res.json({ ok: true });
}

export async function stats(_req: Request, res: Response) {
  const [total, byStatus, byPriority, recent] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Inquiry.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),
    Inquiry.find().sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  const statusMap = Object.fromEntries(
    byStatus.map((s: { _id: string; count: number }) => [s._id, s.count]),
  );
  const priorityMap = Object.fromEntries(
    byPriority.map((s: { _id: string; count: number }) => [s._id, s.count]),
  );

  res.json({
    total,
    newCount: statusMap.New ?? 0,
    highPriority: (priorityMap.High ?? 0) + (priorityMap.Urgent ?? 0),
    inDiscussion: statusMap["In Discussion"] ?? 0,
    won: statusMap.Won ?? 0,
    contacted: statusMap.Contacted ?? 0,
    lost: statusMap.Lost ?? 0,
    archived: statusMap.Archived ?? 0,
    byStatus: statusMap,
    byPriority: priorityMap,
    recent,
  });
}

export async function listAuditLogs(req: Request, res: Response) {
  const { page, limit, action } = req.query as unknown as {
    page: number;
    limit: number;
    action?: string;
  };

  const filter: Record<string, unknown> = {};
  if (action) filter.action = action;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    AuditLog.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),
    AuditLog.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
}
