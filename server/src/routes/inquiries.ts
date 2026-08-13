import { Router } from "express";
import { createInquiry } from "../controllers/inquiryController";
import { asyncHandler } from "../middleware/asyncHandler";
import { inquiryLimiter } from "../middleware/rateLimits";
import { validateBody } from "../middleware/validate";
import { inquirySchema } from "../utils/validators";

const router = Router();

router.post("/", inquiryLimiter, validateBody(inquirySchema), asyncHandler(createInquiry));

export default router;
