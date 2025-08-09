import { z } from "zod";

const commonWords = new Set([
  "the",
  "of",
  "and",
  "a",
  "an",
  "in",
  "on",
  "to",
  "that",
  "is",
  "with",
  "for",
  "as",
  "at",
  "by",
  "from",
  "it",
  "this",
  "which",
]);

export const createDeckSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
});

export const createDeckWithAISchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  notes: z
    .string()
    .min(100, { message: "Notes must be at least 100 characters" })
    .max(8000, { message: "Notes must be less than 8000 characters" }),
  visibility: z.enum(["public", "private"]),
});

export const updateDeckSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" })
    .optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]).optional(),
});

export const flashcardSchema = z
  .object({
    question: z
      .string()
      .min(1, { message: "Question is required" })
      .max(500, { message: "Question must be less than 500 characters" }),

    answer: z
      .string()
      .min(1, { message: "Answer is required" })
      .max(500, { message: "Answer must be less than 500 characters" }),
  })
  .refine(
    ({ question, answer }) => {
      const normalize = (str: string) =>
        str
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter(Boolean);

      const questionWords = new Set(normalize(question));
      const answerWords = normalize(answer);

      for (const word of answerWords) {
        if (questionWords.has(word) && !commonWords.has(word)) {
          return false;
        }
      }

      return true;
    },
    {
      message:
        "Answer must not repeat words from the question (except common words).",
      path: ["answer"],
    }
  );

export type CreateDeckSchema = z.infer<typeof createDeckSchema>;
export type UpdateDeckSchema = z.infer<typeof updateDeckSchema>;
export type FlashcardSchema = z.infer<typeof flashcardSchema>;
export type CreateDeckWithAISchema = z.infer<typeof createDeckWithAISchema>;
