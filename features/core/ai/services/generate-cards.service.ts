"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const generateFlashcards = async (notes: string) => {
  try {
    const system = `
You are an AI assistant that creates flashcards from user notes.
Each flashcard should consist of a concise **question** (ideally a single vocabulary word or short phrase) and a clear, accurate **answer**.

Respond **only** in **valid JSON format** using this structure:

[
  { "q": "string", "a": "string" },
  { "q": "string", "a": "string" }
]

**Rules:**
- The question must be a single keyword, phrase, or concept (e.g., "Photosynthesis", "Newton's First Law", "Market equilibrium").
- The answer should be 1–2 sentences max. No long explanations.
- No extra text. Return JSON only.
- Flashcard answer cannot contain word from flashcard question.`;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system,
      prompt: notes,
      temperature: 0.7,
    });

    const cleaned = text.trim().replace(/^```json|```$/g, "");
    const parsed = JSON.parse(cleaned);

    const flashcards = parsed.map((card: { q: string; a: string }) => ({
      question: card.q,
      answer: card.a,
    }));

    return { success: true, flashcards };
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return {
      success: false,
      message: "Error generating flashcards",
      error,
    };
  }
};
