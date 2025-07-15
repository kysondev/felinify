import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const generateFlashcards = async (notes: string) => {
  try {
    const system = `
You are an AI assistant that creates flashcards from user notes.
Each flashcard should consist of a concise **question** (ideally a single vocabulary word or short phrase) and a clear, accurate **answer**.

Respond **only** in **valid JSON format** using this structure:

[
  { "question": "string", "answer": "string" },
  { "question": "string", "answer": "string" }
]

**Rules:**
- The question must be a single keyword, phrase, or concept (e.g., "Photosynthesis", "Newton's First Law", "Market equilibrium").
- The answer should be 1–2 sentences max. No long explanations.
- No extra text. Return JSON only.`;

    const { text } = await generateText({
      model: google("gemini-2.0-flash-lite"),
      system,
      prompt: notes,
    });
    const cleaned = text.trim().replace(/^```json|```$/g, "");
    const parsed = JSON.parse(cleaned);
    return { success: true, flashcards: parsed };
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return {
      success: false,
      message: "Error generating flashcards",
      error,
    };
  }
};
