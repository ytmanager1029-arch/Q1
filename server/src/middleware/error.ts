import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Not found." });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Please check the form and try again.",
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  const maybe = err as { status?: number; statusCode?: number; message?: string };
  const status = maybe.statusCode || maybe.status || 500;

  if (status >= 500) {
    console.error("[quadrick] server error", err);
  }

  res.status(status).json({
    message:
      status >= 500 && env.isProd
        ? "Something went wrong. Please try again."
        : maybe.message || "Something went wrong. Please try again.",
  });
}
