import { z } from "zod";

const taskSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Title must be at least be 1 character"),
    
    description: z
    .string()
    .trim()
    .min(1, "Description must be at least be 1 charater"),
    status: z
    .enum(["pending", "in-progress", "completed"])
    .default("pending"),
    priority: z
    .enum(["low", "medium", "high"])
    .default("medium"),
    dueDate: z.preprocess((value) => value === "" ? undefined : value,
    z.coerce
    .date()
    .optional()
    )
});

export default taskSchema;