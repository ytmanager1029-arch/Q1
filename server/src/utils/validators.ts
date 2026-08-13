import { z } from "zod";
import { PRIORITIES, PROJECT_TYPES, STATUSES } from "./constants";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v ?? "");

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email.").max(200).toLowerCase(),
  phone: optionalText(40),
  company: optionalText(120),
  website: optionalText(200).refine(
    (v) => !v || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/\w.?#&=+-]*)?$/i.test(v),
    "Enter a valid website.",
  ),
  projectType: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: "Select a project type." }),
  }),
  budget: optionalText(80),
  timeline: optionalText(80),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more about the project (20+ characters).")
    .max(4000),
  source: optionalText(120),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(200).toLowerCase(),
  password: z.string().min(1).max(200),
});

export const inquiryPatchSchema = z
  .object({
    priority: z.enum(PRIORITIES).optional(),
    status: z.enum(STATUSES).optional(),
  })
  .refine((v) => v.priority || v.status, {
    message: "Provide a priority or status to update.",
  });

export const passwordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z
    .string()
    .min(12, "New password must be at least 12 characters.")
    .max(200)
    .regex(/[A-Za-z]/, "Include a letter.")
    .regex(/[0-9]/, "Include a number."),
});

export const inquiryQuerySchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  status: z.enum(STATUSES).optional(),
  priority: z.enum(PRIORITIES).optional(),
  projectType: z.enum(PROJECT_TYPES).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.enum(["newest", "oldest", "priority", "updated"]).optional().default("newest"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export const auditQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(40),
  action: z.string().trim().max(80).optional(),
});
