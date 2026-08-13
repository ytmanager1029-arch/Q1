const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[] | undefined>;

  constructor(status: number, message: string, errors?: Record<string, string[] | undefined>) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${base}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });

  const data = (await res.json().catch(() => ({}))) as {
    message?: string;
    errors?: Record<string, string[] | undefined>;
  };

  if (!res.ok) {
    throw new ApiError(res.status, data.message || "Request failed.", data.errors);
  }

  return data as T;
}

export type InquiryPayload = {
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

export type Inquiry = {
  _id: string;
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
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "New" | "Contacted" | "In Discussion" | "Won" | "Lost" | "Archived";
  createdAt: string;
  updatedAt: string;
};

export type AuditItem = {
  _id: string;
  action: string;
  entityType: string;
  entityId?: string;
  adminId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
};

export type AdminUser = {
  id: string;
  email: string;
  role: "admin";
  lastLoginAt?: string;
  createdAt?: string;
};
