import type { NextFunction, Request, Response } from "express";

function stripOperators(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripOperators);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (key.startsWith("$") || key.includes(".")) continue;
      out[key] = stripOperators(nested);
    }
    return out;
  }
  return value;
}

export function sanitizeRequest(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = stripOperators(req.body);
  }
  if (req.query && typeof req.query === "object") {
    const cleaned = stripOperators(req.query);
    Object.assign(req.query, cleaned);
  }
  next();
}
