import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function requiredInProduction(name: string, value: string | undefined): string {
  if (process.env.NODE_ENV === "production" && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

const NODE_ENV = process.env.NODE_ENV ?? "development";
const isProd = NODE_ENV === "production";

export const env = {
  NODE_ENV,
  isProd,
  isDev: NODE_ENV !== "production",
  PORT: Number(process.env.PORT ?? 4000),
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  AUTH_SECRET: requiredInProduction(
    "AUTH_SECRET",
    process.env.AUTH_SECRET || (isProd ? "" : "quadrick-dev-secret-not-for-prod"),
  ),
  AUTH_EXPIRES_DAYS: Number(process.env.AUTH_EXPIRES_DAYS ?? 7),
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "",
  ADMIN_RESET: process.env.ADMIN_RESET === "true",
};

export function extraCorsOrigins(): string[] {
  const extras = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return extras;
}
