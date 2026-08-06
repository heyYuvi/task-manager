import { z } from "zod";

const updateTaskSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Title must at least be 1 character")
    .optional(),
    description: z
    .string()
    .trim()
    .min(1, "Title must at least be 1 character")
    .optional(),
    status: z
    .enum(["pending", "in-progress", "completed"])
    .optional(),
    priority: z
    .enum(["low", "medium", "high"])
    .optional(),
    dueDate: z
    .coerce
    .date()
    .optional()
});

export default updateTaskSchema;