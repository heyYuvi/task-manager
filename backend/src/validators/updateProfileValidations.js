import { z } from "zod";

const updateProfileSchema = z.object({
    name: z
    .string()
    .trim()
    .min(1, "Name must at least be 1 character")
    .optional()
});

export default updateProfileSchema;

