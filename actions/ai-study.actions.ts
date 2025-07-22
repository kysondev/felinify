import {
  generateFlashcards,
  generateAdaptiveQuiz,
} from "services/ai-study.service";
import { getUser } from "services/user.service";
import {
  addFlashcard,
  getDeckById,
  createQuizAccessToken,
  validateQuizAccessToken,
} from "services/deck.service";
import { createDeckWithAISchema } from "lib/validations/deck.schema";

export const generateFlashcardsAction = async (name: string, notes: string) => {
  try {
    const result = createDeckWithAISchema.safeParse({
      name,
      notes,
    });
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }
    const { data: user } = await getUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const generatedFlashcards = await generateFlashcards(notes);
    if (!generatedFlashcards.success) {
      return {
        success: false,
        message: generatedFlashcards.message || "Failed to generate flashcards",
      };
    }

    return {
      success: true,
      flashcards: generatedFlashcards.flashcards,
    };
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return {
      success: false,
      message: "Error generating flashcards",
    };
  }
};

export const addGeneratedFlashcardsToDeckAction = async (
  userId: string,
  deckId: string,
  flashcards: { question: string; answer: string }[]
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const results = [];
    let failedCount = 0;

    for (const flashcard of flashcards) {
      const result = await addFlashcard(userId, {
        question: flashcard.question,
        answer: flashcard.answer,
        deckId,
      });

      if (result.success) {
        results.push(result.data);
      } else {
        failedCount++;
      }
    }

    if (failedCount === flashcards.length) {
      return {
        success: false,
        message: "Failed to add any flashcards to the deck",
      };
    }

    return {
      success: true,
      message: `Added ${results.length} flashcards to the deck${
        failedCount > 0 ? ` (${failedCount} failed)` : ""
      }`,
      addedCount: results.length,
      failedCount,
    };
  } catch (error) {
    console.error("Error adding flashcards to deck:", error);
    return {
      success: false,
      message: "Error adding flashcards to deck",
    };
  }
};

export const generateAdaptiveQuizAction = async (
  deckId: string,
  numQuestions: number
) => {
  try {
    const userResult = await getUser();
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!userResult.data.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const userId = userResult.data.id;

    const deckResult = await getDeckById(deckId, userId);
    if (!deckResult.success || !deckResult.data) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    const deck = deckResult.data;

    if (!deck.flashcards || deck.flashcards.length < 10) {
      return {
        success: false,
        message: "Deck must have at least 10 flashcards",
      };
    }

    if (!deck.progress || deck.progress.mastery < 10) {
      return {
        success: false,
        message: "You need at least 10% mastery in this deck",
      };
    }

    if (!deck.progress || (deck.progress.challengeCompleted || 0) < 3) {
      return {
        success: false,
        message: "Complete Challenge Mode at least 3 times first",
      };
    }

    const flashcardsWithPerformance = deck.flashcards.map((card) => ({
      id: card.id,
      question: card.question,
      answer: card.answer,
      numCorrect: (card as any).numCorrect || 0,
      numIncorrect: (card as any).numIncorrect || 0,
    }));

    const quizResult = await generateAdaptiveQuiz(
      flashcardsWithPerformance,
      numQuestions
    );
    if (!quizResult.success) {
      return {
        success: false,
        message: quizResult.message || "Failed to generate quiz questions",
      };
    }

    return {
      success: true,
      questions: quizResult.questions,
    };
  } catch (error) {
    console.error("Error generating adaptive quiz:", error);
    return {
      success: false,
      message: "Error generating adaptive quiz",
    };
  }
};

export const createQuizAccessTokenAction = async (
  deckId: string,
  numQuestions: number
) => {
  try {
    const userResult = await getUser();
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    if (!userResult.data.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const userId = userResult.data.id;

    const deckResult = await getDeckById(deckId, userId);
    if (!deckResult.success || !deckResult.data) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    const deck = deckResult.data;

    if (!deck.flashcards || deck.flashcards.length < 10) {
      return {
        success: false,
        message: "Deck must have at least 10 flashcards",
      };
    }

    if (!deck.progress || deck.progress.mastery < 10) {
      return {
        success: false,
        message: "You need at least 10% mastery in this deck",
      };
    }

    if (!deck.progress || (deck.progress.challengeCompleted || 0) < 3) {
      return {
        success: false,
        message: "Complete Challenge Mode at least 3 times first",
      };
    }

    const tokenResult = await createQuizAccessToken(
      userId,
      deckId,
      numQuestions
    );
    if (!tokenResult.success) {
      return {
        success: false,
        message: tokenResult.message || "Failed to create access token",
      };
    }

    return {
      success: true,
      token: tokenResult.data?.token,
      numQuestions: tokenResult.data?.numQuestions,
    };
  } catch (error) {
    console.error("Error creating quiz access token:", error);
    return {
      success: false,
      message: "Error creating quiz access token",
    };
  }
};

export const validateQuizAccessTokenAction = async (
  token: string,
  deckId: string
) => {
  try {
    const userResult = await getUser();
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!userResult.data.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const userId = userResult.data.id;

    const validationResult = await validateQuizAccessToken(
      token,
      userId,
      deckId
    );
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.message || "Invalid access token",
      };
    }

    return {
      success: true,
      numQuestions: validationResult.data?.numQuestions || 10,
    };
  } catch (error) {
    console.error("Error validating quiz access token:", error);
    return {
      success: false,
      message: "Error validating quiz access token",
    };
  }
};
