import mongoose, { Schema } from "mongoose";
import { Inquiries } from "../db/runtime";
import { PRIORITIES, PROJECT_TYPES, STATUSES } from "../utils/constants";

const inquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    company: { type: String, default: "", trim: true, maxlength: 120 },
    website: { type: String, default: "", trim: true, maxlength: 200 },
    projectType: { type: String, required: true, enum: PROJECT_TYPES },
    budget: { type: String, default: "", trim: true, maxlength: 80 },
    timeline: { type: String, default: "", trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    source: { type: String, default: "", trim: true, maxlength: 120 },
    priority: { type: String, enum: PRIORITIES, default: "Medium" },
    status: { type: String, enum: STATUSES, default: "New" },
  },
  { timestamps: true },
);

inquirySchema.index({ email: 1, createdAt: -1 });
inquirySchema.index({ status: 1, priority: 1, createdAt: -1 });
inquirySchema.index({ name: "text", email: "text", company: "text" });

export const InquiryMongo = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

export const Inquiry = Inquiries as any;
