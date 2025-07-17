"use server";
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
      model: google("gemini-2.0-flash"),
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

export const generateAdaptiveQuiz = async (
  flashcards: {
    id: string;
    question: string;
    answer: string;
    numCorrect: number;
    numIncorrect: number;
  }[],
  numQuestions: number
) => {
  try {
    const validatedFlashcards = flashcards.map((card) => ({
      ...card,
      numCorrect: typeof card.numCorrect === "number" ? card.numCorrect : 0,
      numIncorrect:
        typeof card.numIncorrect === "number" ? card.numIncorrect : 0,
    }));

    const sortedFlashcards = [...validatedFlashcards].sort((a, b) => {
      const aRatio = a.numIncorrect / Math.max(a.numCorrect, 1);
      const bRatio = b.numIncorrect / Math.max(b.numCorrect, 1);

      if (aRatio === 0 && bRatio === 0) {
        return a.numCorrect + a.numIncorrect - (b.numCorrect + b.numIncorrect);
      }

      return bRatio - aRatio;
    });

    const targetFlashcards = sortedFlashcards.slice(
      0,
      Math.min(numQuestions * 2, sortedFlashcards.length)
    );

    const system = `
You are an AI quiz generator that creates multiple-choice questions based on flashcards.
For each flashcard, create a question that tests the user's understanding of the concept.
The question should not be identical to the flashcard question but should test the same knowledge that is included in the flashcard.

Respond **only** in **valid JSON format** using this structure:

[
  {
    "question": "string",
    "correctAnswer": "string",
    "options": ["string", "string", "string", "string"],
    "originalFlashcardId": "string"
  }
]

**Rules:**
- Generate exactly ${numQuestions} questions
- The question should be clear and concise (1-2 sentences max)
- Each question must have exactly 4 options
- The correctAnswer must be one of the options
- The options should be plausible but only one should be correct
- The originalFlashcardId should be included to track which flashcard the question is based on
- No extra text. Return JSON only.`;

    const flashcardsInput = JSON.stringify(
      targetFlashcards.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      }))
    );

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system,
      prompt: `Generate ${numQuestions} adaptive quiz questions based on these flashcards, focusing on concepts that need more practice: ${flashcardsInput}`,
    });

    const cleaned = text.trim().replace(/^```json|```$/g, "");
    const parsed = JSON.parse(cleaned);
    return { success: true, questions: parsed };
  } catch (error) {
    console.error("Error generating adaptive quiz:", error);
    return {
      success: false,
      message: "Error generating adaptive quiz questions",
      error,
    };
  }
};
