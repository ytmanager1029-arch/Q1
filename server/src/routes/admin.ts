import { Router } from "express";
import {
  deleteInquiry,
  getInquiry,
  listAuditLogs,
  listInquiries,
  patchInquiry,
  stats,
} from "../controllers/adminController";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireAuth } from "../middleware/auth";
import { adminLimiter } from "../middleware/rateLimits";
import { validateBody, validateQuery } from "../middleware/validate";
import { auditQuerySchema, inquiryPatchSchema, inquiryQuerySchema } from "../utils/validators";

const router = Router();

router.use(requireAuth, adminLimiter);

router.get("/stats", asyncHandler(stats));
router.get("/inquiries", validateQuery(inquiryQuerySchema), asyncHandler(listInquiries));
router.get("/inquiries/:id", asyncHandler(getInquiry));
router.patch("/inquiries/:id", validateBody(inquiryPatchSchema), asyncHandler(patchInquiry));
router.delete("/inquiries/:id", asyncHandler(deleteInquiry));
router.get("/audit-logs", validateQuery(auditQuerySchema), asyncHandler(listAuditLogs));

export default router;
