import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { inquirySchema, loginSchema, passwordSchema } from "./validators";

describe("inquirySchema", () => {
  it("accepts a complete inquiry", () => {
    const parsed = inquirySchema.parse({
      name: "Jordan Hale",
      email: "jordan@example.com",
      phone: "",
      company: "Northline",
      website: "northline.example",
      projectType: "Website",
      budget: "15–30k",
      timeline: "8 weeks",
      message: "We need a new marketing site for a product launch this autumn.",
      source: "Referral",
    });
    assert.equal(parsed.email, "jordan@example.com");
    assert.equal(parsed.projectType, "Website");
  });

  it("rejects a short message", () => {
    const result = inquirySchema.safeParse({
      name: "Jo",
      email: "jo@example.com",
      projectType: "SaaS",
      message: "Hi",
    });
    assert.equal(result.success, false);
  });
});

describe("loginSchema", () => {
  it("normalizes email", () => {
    const parsed = loginSchema.parse({ email: "Admin@Quadrick.dev", password: "secret" });
    assert.equal(parsed.email, "admin@quadrick.dev");
  });
});

describe("passwordSchema", () => {
  it("requires length and complexity", () => {
    const bad = passwordSchema.safeParse({
      currentPassword: "old",
      newPassword: "short",
    });
    assert.equal(bad.success, false);
    const good = passwordSchema.safeParse({
      currentPassword: "old-password-1",
      newPassword: "NewPassword2026",
    });
    assert.equal(good.success, true);
  });
});
