import type { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { COOKIE_NAME } from "./constants";

export type TokenPayload = {
  sub: string;
  email: string;
  role: "admin";
};

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.AUTH_SECRET, {
    expiresIn: `${env.AUTH_EXPIRES_DAYS}d`,
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.AUTH_SECRET) as TokenPayload;
}

export function cookieOptions(): CookieOptions {
  const crossSite =
    env.isProd &&
    env.CLIENT_URL.startsWith("https://") &&
    !env.CLIENT_URL.includes("localhost");

  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: crossSite ? "none" : "lax",
    maxAge: env.AUTH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

export function setSessionCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAME, token, cookieOptions());
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME, {
    ...cookieOptions(),
    maxAge: 0,
  });
}
