import express from "express";
import { login, logout, register } from "../controllers/UserController.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/logout", logout);

export default router;