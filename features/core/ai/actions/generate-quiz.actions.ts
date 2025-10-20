import { generateAdaptiveQuiz } from "@ai/services/generate-quiz.service";
import { getUser } from "@user/services/user.service";
import { getUserDeckById } from "@deck/services/deck-read.service";

export const generateAdaptiveQuizAction = async (
  deckId: number,
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

    const deckResult = await getUserDeckById(deckId, userId);
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
      id: String(card.id),
      term: card.term,
      definition: card.definition,
      termImageUrl: card.termImageUrl,
      numCorrect: Number((card as any).numCorrect || 0),
      numIncorrect: Number((card as any).numIncorrect || 0),
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
