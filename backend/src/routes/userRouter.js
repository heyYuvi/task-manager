import express from "express";
import { login, logout, register, updateProfile, uploadAvatar } from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/logout", logout);
router.put("/avatar", protect, upload.single("image"),uploadAvatar);
router.put("/profile", protect, upload.single("image"), updateProfile);

export default router;