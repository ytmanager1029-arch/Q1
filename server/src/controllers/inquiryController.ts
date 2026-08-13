import type { Request, Response } from "express";
import { Inquiry } from "../models/Inquiry";
import { writeAudit } from "../services/audit";
import { AUDIT_ACTIONS } from "../utils/constants";

function normalizeWebsite(value: string): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export async function createInquiry(req: Request, res: Response) {
  const body = req.body as {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
    source: string;
  };

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const duplicate = await Inquiry.findOne({
    email: body.email,
    message: body.message,
    createdAt: { $gte: since },
  }).lean();

  if (duplicate) {
    res.status(200).json({
      ok: true,
      duplicate: true,
      id: String(duplicate._id),
      message: "We've already received this inquiry. We'll be in touch soon.",
    });
    return;
  }

  const inquiry = await Inquiry.create({
    ...body,
    website: normalizeWebsite(body.website),
    priority: "Medium",
    status: "New",
  });

  await writeAudit({
    action: AUDIT_ACTIONS.INQUIRY_CREATED,
    entityType: "inquiry",
    entityId: inquiry._id,
    metadata: {
      email: inquiry.email,
      projectType: inquiry.projectType,
      source: inquiry.source,
    },
  });

  res.status(201).json({
    ok: true,
    id: String(inquiry._id),
    message: "Your inquiry has been received. We'll be in touch soon.",
  });
}
