import {
  NewStudySession,
  UpdateDeck,
  UpdateProgress,
} from "db/types/models.types";
import {
  createDeck,
  updateDeck,
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
  deleteDeck,
  saveStudyProgressToDeck,
  saveStudySession,
  updateChallengeCompletionCount,
  updateFlashcardPerformance,
} from "services/deck.service";
import { getUser } from "services/user.service";

export const createDeckAction = async (
  userId: string,
  name: string,
  description?: string
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await createDeck({
      name: name as string,
      userId: userId,
      description: description as string,
      visibility: "public",
      rating: 0,
      studyCount: 0,
      studyHour: 0,
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
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
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
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
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

export const saveStudyProgressAction = async (data: UpdateProgress) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const { success, message } = await saveStudyProgressToDeck(data as UpdateProgress);
    if (success) {
      return {
        success: true,
        message: "Study progress saved successfully",
      };
    } else {
      return { success: false, message: message };
    }
  } catch (error) {
    console.error("Error saving study progress:", error);
    return { success: false, message: "Error saving study progress", error };
  }
};

export const saveStudySessionAction = async (data: NewStudySession) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await saveStudySession(data);

    if (result.success) {
      return {
        success: true,
        message: "Study session started successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error starting study session:", error);
    return { success: false, message: "Error starting study session", error };
  }
};

export const updateChallengeCompletionAction = async (
  userId: string,
  deckId: string
) => {
  try {
    const result = await updateChallengeCompletionCount(userId, deckId);
    return result;
  } catch (error) {
    console.error("Error updating challenge completion count:", error);
    return {
      success: false,
      message: "Error updating challenge completion count",
    };
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
