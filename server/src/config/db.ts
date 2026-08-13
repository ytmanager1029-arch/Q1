import mongoose from "mongoose";
import { initFileCollections, setCollection } from "../db/runtime";
import { AuditLogMongo } from "../models/AuditLog";
import { InquiryMongo } from "../models/Inquiry";
import { UserMongo } from "../models/User";
import { env } from "./env";

export type DbMode = "mongo" | "file";
export let dbMode: DbMode = "file";

export async function connectDb(): Promise<void> {
  mongoose.set("strictQuery", true);

  if (env.MONGODB_URI) {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 12_000,
    });
    setCollection("users", UserMongo as never);
    setCollection("inquiries", InquiryMongo as never);
    setCollection("auditlogs", AuditLogMongo as never);
    dbMode = "mongo";
    console.log("[quadrick] connected to MongoDB");
    return;
  }

  if (env.isProd) {
    throw new Error("MONGODB_URI is required in production.");
  }

  initFileCollections();
  dbMode = "file";
  console.log(
    "[quadrick] using local document store at server/.data (set MONGODB_URI for MongoDB Atlas)",
  );
}

export async function disconnectDb(): Promise<void> {
  if (dbMode === "mongo") {
    await mongoose.disconnect();
  }
}
