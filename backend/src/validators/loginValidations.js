import { z } from "zod";

const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid Email Address"),
    password: z
    .string()
    .trim()
    .min(8, "Passoword must at least be 8 characters")
});

export default loginSchema;