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

    const flashcardsInput = targetFlashcards
      .map((f) => `ID: ${f.id} | Q: ${f.question} | A: ${f.answer}`)
      .join("\n\n");

    const system = `
You are an AI quiz generator that creates multiple-choice questions based on flashcards.
For each flashcard, create a question that tests the user's understanding of the concept.
The question should not be identical to the flashcard question but should test the same knowledge.

Respond ONLY in valid JSON format using this structure:
[
  {
    "question": "Your question here",
    "correctAnswer": "The correct answer",
    "options": ["option1", "option2", "option3", "option4"],
    "originalFlashcardId": "the ID from the input flashcard"
  }
]

Rules:
- Generate exactly ${numQuestions} questions (one per flashcard)
- Each question must have exactly 4 options
- The correctAnswer must be one of the options
- The options should be plausible but only one should be correct
- The originalFlashcardId MUST be copied exactly from the input (format: "ID: xyz")
- The position of the correct answer should be random
- Questions should be clear and concise (1-2 sentences)
- No extra text or explanations outside the JSON structure
- Flashcard answer cannot contain word from flashcard question.`;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system,
      temperature: 0.5,
      prompt: `Generate ${numQuestions} quiz questions based on these flashcards. Create one question per flashcard and ensure you copy the exact ID for each flashcard into the originalFlashcardId field.\n\n${flashcardsInput}`,
    });

    try {
      const cleaned = text.trim().replace(/^```json|```$/g, "");
      const parsed = JSON.parse(cleaned);

      const questions = parsed.map(
        (question: {
          question: string;
          correctAnswer: string;
          options: string[];
          originalFlashcardId: string;
        }) => {
          const idMatch = question.originalFlashcardId.match(/ID: (.*)/);
          if (idMatch && idMatch[1]) {
            question.originalFlashcardId = idMatch[1];
          }

          question.options = shuffle([...question.options]);

          return question;
        }
      );

      console.log(questions);
      return { success: true, questions };
    } catch (error) {
      console.error("Error parsing quiz questions:", error);
      return {
        success: false,
        message: "Error parsing generated quiz questions",
        error,
      };
    }
  } catch (error) {
    console.error("Error generating adaptive quiz:", error);
    return {
      success: false,
      message: "Error generating adaptive quiz questions",
      error,
    };
  }
};
