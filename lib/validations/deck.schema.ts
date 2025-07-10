import { z } from "zod";

export const createDeckSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(20, { message: "Name must be less than 20 characters" }),
    description: z.string().optional(),
});