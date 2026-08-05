import express from "express";
import { createTask, getAllTask } from "../controllers/TaskContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/task", protect, createTask);
router.get("/tasks", protect, getAllTask);

export default router;