import { UpdateDeck } from "db/types/models.types";
import {
  createDeck,
  updateDeck,
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
  deleteDeck,
} from "services/deck.service";
import { getUser } from "services/user.service";

export const createDeckAction = async (
  userId: string,
  name: string,
  description?: string
) => {
  try {
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
    }
    const result = await createDeck({
      name: name as string,
      userId: userId,
      description: description as string,
    });
    if (result.success) {
      return {
        success: true,
        message: "Deck created successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error creating deck:", error);
    return { success: false, message: "Error creating deck", error };
  }
};

export const updateDeckAction = async (deckData: UpdateDeck) => {
  try {
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
    }
    const result = await updateDeck(deckData);
    if (result.success) {
      return {
        success: true,
        message: "Deck updated successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error updating deck:", error);
    return { success: false, message: "Error updating deck", error };
  }
};

export const deleteDeckAction = async (deckId: string, userId: string) => {
  try {
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
    }
    const result = await deleteDeck(deckId, userId);
    if (result.success) {
      return {
        success: true,
        message: "Deck deleted successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error deleting deck:", error);
    return { success: false, message: "Error deleting deck", error };
  }
};

export const addFlashcardAction = async (
  deckId: string,
  userId: string,
  question: string,
  answer: string
) => {
  try {
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
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
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
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
    const { success } = await getUser();
    if (!success) {
      return { success: false, message: "User not found" };
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
