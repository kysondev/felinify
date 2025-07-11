import { z } from "zod";

export const createDeckSchema = z.object({
    name: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
    description: z.string()
    .optional(),
});

export const updateDeckSchema = z.object({
    name: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" })
    .optional(),
    description: z.string()
    .optional(),
});

export const flashcardSchema = z.object({
    question: z.string()
    .min(1, { message: "Question is required" })
    .max(500, { message: "Question must be less than 500 characters" }),
    answer: z.string()
    .min(1, { message: "Answer is required" })
    .max(500, { message: "Answer must be less than 500 characters" }),
});

export type CreateDeckSchema = z.infer<typeof createDeckSchema>;
export type UpdateDeckSchema = z.infer<typeof updateDeckSchema>;
export type FlashcardSchema = z.infer<typeof flashcardSchema>;