"use server";

import { generateFlashcards } from "@ai/services/generate-cards.service";
import { addFlashcard } from "@deck/services/flashcards.service";
import { createDeckWithAISchema } from "@deck/validations/deck.schema";
import {
  getUser,
  getUserEnergy,
  updateUserEnergy,
} from "@user/services/user.service";

export const generateFlashcardsAction = async (
  name: string,
  notes: string,
  visibility: "public" | "private"
) => {
  try {
    const result = createDeckWithAISchema.safeParse({
      name,
      notes,
      visibility,
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

    const userEnergy = await getUserEnergy(user.id);

    if (userEnergy <= 0) {
      return {
        success: false,
        message: "You don't have enough energy to generate flashcards",
      };
    }

    const generatedFlashcards = await generateFlashcards(notes);
    if (!generatedFlashcards.success) {
      return {
        success: false,
        message: generatedFlashcards.message || "Failed to generate flashcards",
      };
    }

    const updatedEnergy = await updateUserEnergy(user.id, userEnergy - 1);

    if (!updatedEnergy.success) {
      return {
        success: false,
        message: updatedEnergy.message || "Failed to update user energy",
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
