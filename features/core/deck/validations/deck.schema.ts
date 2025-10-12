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
    .max(50, { message: "Name must be less than 50 characters" }),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
});

export const createDeckWithAISchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
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
    .max(50, { message: "Name must be less than 50 characters" })
    .optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]).optional(),
});

export const flashcardSchema = z
  .object({
    term: z
      .string()
      .min(1, { message: "Term is required" })
      .max(500, { message: "Term must be less than 500 characters" }),

    definition: z
      .string()
      .min(1, { message: "Definition is required" })
      .max(500, { message: "Definition must be less than 500 characters" }),

    termImageUrl: z
      .string()
      .url({ message: "Invalid term image URL" })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    ({ term, definition }) => {
      const normalize = (str: string) =>
        str
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter(Boolean);

      const termWords = new Set(normalize(term));
      const definitionWords = normalize(definition);

      for (const word of definitionWords) {
        if (termWords.has(word) && !commonWords.has(word)) {
          return false;
        }
      }

      return true;
    },
    {
      message:
        "Definition must not repeat words from the term (except common words).",
      path: ["definition"],
    }
  );

export type CreateDeckSchema = z.infer<typeof createDeckSchema>;
export type UpdateDeckSchema = z.infer<typeof updateDeckSchema>;
export type FlashcardSchema = z.infer<typeof flashcardSchema>;
export type CreateDeckWithAISchema = z.infer<typeof createDeckWithAISchema>;
