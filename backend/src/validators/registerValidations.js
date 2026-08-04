import { z } from "zod";

const registerSchema = z.object({
    name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .trim(),
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid Email Address"),
    password: z
    .string()
    .trim()
    .min(8, "Password must at least be 8 characters")
});

export default registerSchema; 