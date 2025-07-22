"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { shuffle } from "utils/flashcard.utils";

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
- No extra text. Return JSON only.
- Flashcard answer cannot contain word from flashcard question.`;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
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

    const targetFlashcards = shuffle(
      sortedFlashcards.slice(
        0,
        Math.min(numQuestions * 2, sortedFlashcards.length)
      )
    ).slice(0, numQuestions);

    const questionPromises = targetFlashcards.map(async (flashcard) => {
      const system = `You are an AI quiz generator. Create ONE multiple-choice question based on this flashcard.
Respond ONLY in valid JSON format:
{
  "q": "Your question here",
  "c": "The correct answer", 
  "o": ["o1", "o2", "o3", "o4"],
  "id": "${flashcard.id}"
}
Rules:
- Create a question that tests understanding but isn't identical to the flashcard question
- Include exactly 4 plausible options with only one correct
- Make the question clear and concise
- Position the correct answer randomly`;

      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system,
        temperature: 0.7,
        prompt: `Flashcard: Q: ${flashcard.question} | A: ${flashcard.answer}`,
      });

      const cleaned = text.trim().replace(/^```json|```$/g, "");
      const question = JSON.parse(cleaned);
      question.o = shuffle([...question.o]);
      return question;
    });

    const questions = await Promise.all(questionPromises);

    return { success: true, questions };
  } catch (error) {
    console.error("Error generating adaptive quiz:", error);
    return {
      success: false,
      message: "Error generating adaptive quiz questions",
      error,
    };
  }
};
