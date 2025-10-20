import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  description: z
    .string()
    .max(500, { message: "Review must be less than 500 characters" })
    .optional(),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>; 