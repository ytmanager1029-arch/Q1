export const PROJECT_TYPES = [
  "Website",
  "E-commerce",
  "Web Application",
  "SaaS",
  "Landing Page",
  "Redesign",
  "Other",
] as const;

export const PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;

export const STATUSES = [
  "New",
  "Contacted",
  "In Discussion",
  "Won",
  "Lost",
  "Archived",
] as const;

export const AUDIT_ACTIONS = {
  LOGIN: "admin.login",
  LOGOUT: "admin.logout",
  INQUIRY_CREATED: "inquiry.created",
  STATUS_CHANGED: "inquiry.status_changed",
  PRIORITY_CHANGED: "inquiry.priority_changed",
  INQUIRY_DELETED: "inquiry.deleted",
  PASSWORD_CHANGED: "admin.password_changed",
} as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];

export const COOKIE_NAME = "qrk_session";

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};
