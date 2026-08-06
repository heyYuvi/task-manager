import express from "express";
import { createTask, deleteTask, getAllTask, getSingleTask, updateTask } from "../controllers/TaskContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/tasks", protect, getAllTask);
router.get("/task/:id", protect, getSingleTask);
router.post("/task", protect, createTask);
router.put("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

export default router;