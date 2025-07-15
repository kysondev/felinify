import { generateFlashcards } from "services/ai-study.service";
import { getUser } from "services/user.service";
import { addFlashcard } from "services/deck.service";
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
    const { success } = await getUser();
    if (!success) {
      return {
        success: false,
        message: "Unauthorized",
      };
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
    const { success } = await getUser();
    if (!success) {
      return {
        success: false,
        message: "Unauthorized",
      };
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
