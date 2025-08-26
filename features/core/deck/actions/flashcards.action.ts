import {
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
  updateFlashcardPerformance,
} from "@deck/services/flashcards.service";
import { getUser } from "@user/services/user.service";

export const addFlashcardAction = async (
  deckId: string,
  userId: string,
  question: string,
  answer: string
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await addFlashcard(userId, {
      question,
      answer,
      deckId,
    });

    if (result.success) {
      return {
        success: true,
        message: "Flashcard added successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error adding flashcard:", error);
    return { success: false, message: "Error adding flashcard", error };
  }
};

export const updateFlashcardAction = async (
  flashcardId: string,
  flashcardData: { question: string; answer: string }
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await updateFlashcard(flashcardId, flashcardData);

    if (result.success) {
      return {
        success: true,
        message: "Flashcard updated successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return { success: false, message: "Error updating flashcard", error };
  }
};

export const deleteFlashcardAction = async (
  flashcardId: string,
  userId: string
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await deleteFlashcard(flashcardId, userId);
    if (result.success) {
      return {
        success: true,
        message: "Flashcard deleted successfully",
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return { success: false, message: "Error deleting flashcard", error };
  }
};

export const updateFlashcardPerformanceAction = async (
  userId: string,
  flashcardResults: {
    flashcardId: string;
    isCorrect: boolean;
  }[]
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await updateFlashcardPerformance(userId, flashcardResults);
    return result;
  } catch (error) {
    console.error("Error updating flashcard performance:", error);
    return {
      success: false,
      message: "Error updating flashcard performance",
      error,
    };
  }
};
