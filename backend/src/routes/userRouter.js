import express from "express";
import { login, logout, register, updateProfile, uploadAvatar } from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import { generalLimiter, loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/auth/register", loginLimiter, register);
router.post("/auth/login", loginLimiter, login);
router.get("/auth/logout", logout);
router.put("/avatar", protect, upload.single("image"),uploadAvatar);
router.put("/profile",  generalLimiter, protect, upload.single("image"), updateProfile);

export default router;