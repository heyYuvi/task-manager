import express from "express";
import { createTask, deleteTask, getAllTask, getSingleTask, updateTask } from "../controllers/TaskContoller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { generalLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/tasks", generalLimiter ,protect, getAllTask);
router.get("/task/:id",  generalLimiter ,protect, getSingleTask);
router.post("/task",  generalLimiter ,protect, createTask);
router.put("/task/:id",  generalLimiter ,protect, updateTask);
router.delete("/task/:id",  generalLimiter ,protect, deleteTask);

export default router;