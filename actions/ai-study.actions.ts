import { generateFlashcards } from "services/ai-study.service";
import { getUser } from "services/user.service";

export const generateFlashcardsAction = async (notes: string) => {
  try {
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
