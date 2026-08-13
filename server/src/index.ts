import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import { connectDb } from "./config/db";
import { env, extraCorsOrigins } from "./config/env";
import { errorHandler, notFound } from "./middleware/error";
import { generalLimiter } from "./middleware/rateLimits";
import { sanitizeRequest } from "./middleware/sanitize";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";
import inquiryRoutes from "./routes/inquiries";
import { seedAdminIfNeeded } from "./services/seed";

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;

  const allowed = new Set<string>([
    env.CLIENT_URL.replace(/\/$/, ""),
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    ...extraCorsOrigins(),
  ]);

  if (allowed.has(origin)) return true;

  if (env.isDev) {
    try {
      const host = new URL(origin).hostname;
      if (host.endsWith(".e2b.app") || host.endsWith(".localhost")) return true;
    } catch {
      return false;
    }
  }

  return false;
}

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin not allowed."));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

async function bootstrap() {
  await connectDb();
  await seedAdminIfNeeded();

  const app = express();

  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: false, limit: "32kb" }));
  app.use(cookieParser());
  app.use(sanitizeRequest);
  app.use("/api", generalLimiter);

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "quadrick-api",
      time: new Date().toISOString(),
    });
  });

  app.use("/api/inquiries", inquiryRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`[quadrick] api listening on :${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("[quadrick] failed to start", err);
  process.exit(1);
});
