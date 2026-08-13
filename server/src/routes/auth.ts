import { Router } from "express";
import { changePassword, login, logout, me } from "../controllers/authController";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireAuth } from "../middleware/auth";
import { loginLimiter } from "../middleware/rateLimits";
import { validateBody } from "../middleware/validate";
import { loginSchema, passwordSchema } from "../utils/validators";

const router = Router();

router.post("/login", loginLimiter, validateBody(loginSchema), asyncHandler(login));
router.post("/logout", requireAuth, asyncHandler(logout));
router.get("/me", requireAuth, asyncHandler(me));
router.patch("/password", requireAuth, validateBody(passwordSchema), asyncHandler(changePassword));

export default router;
