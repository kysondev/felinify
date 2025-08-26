"use server";
import cuid from "cuid";
import { NewFlashcard, UpdateFlashcard } from "db/types/models.types";
import { db } from "lib/db";

export const addFlashcard = async (
  userId: string,
  flashcardData: NewFlashcard
) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", flashcardData.deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message:
          "Deck not found or you don't have permission to add flashcards",
      };
    }

    const newFlashcard = await db
      .insertInto("flashcard")
      .values({
        id: cuid(),
        question: flashcardData.question,
        answer: flashcardData.answer,
        deckId: flashcardData.deckId,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newFlashcard) {
      return { success: false, message: "Error creating flashcard" };
    }

    const newFlashcardPerformance = await db
      .insertInto("flashcardPerformance")
      .values({
        id: cuid(),
        flashcardId: newFlashcard.id,
        userId: userId,
        timesStudied: 0,
        correctCount: 0,
        incorrectCount: 0,
        easeFactor: 1,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .execute();

    if (!newFlashcardPerformance) {
      return {
        success: false,
        message: "Error creating flashcard performance",
      };
    }

    return { success: true, data: newFlashcard };
  } catch (error) {
    console.error("Error adding flashcard:", error);
    return { success: false, message: "Error adding flashcard", error };
  }
};

export const updateFlashcard = async (
  flashcardId: string,
  flashcardData: UpdateFlashcard
) => {
  try {
    const flashcardExists = await db
      .selectFrom("flashcard")
      .select("id")
      .where("id", "=", flashcardId)
      .executeTakeFirst();

    if (!flashcardExists) {
      return {
        success: false,
        message:
          "Flashcard not found or you don't have permission to update it",
      };
    }

    const updatedFlashcard = await db
      .updateTable("flashcard")
      .set({
        question: flashcardData.question,
        answer: flashcardData.answer,
        updatedAt: new Date(),
      })
      .where("id", "=", flashcardId)
      .returningAll()
      .executeTakeFirst();

    if (!updatedFlashcard) {
      return {
        success: false,
        message: "Error updating flashcard",
      };
    }

    return { success: true, data: updatedFlashcard };
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return { success: false, message: "Error updating flashcard", error };
  }
};

export const deleteFlashcard = async (flashcardId: string, userId: string) => {
  try {
    const flashcardExists = await db
      .selectFrom("flashcard")
      .innerJoin("deck", "deck.id", "flashcard.deckId")
      .select("flashcard.id")
      .where("flashcard.id", "=", flashcardId)
      .where("deck.userId", "=", userId)
      .executeTakeFirst();

    if (!flashcardExists) {
      return {
        success: false,
        message:
          "Flashcard not found or you don't have permission to delete it",
      };
    }

    await db.deleteFrom("flashcard").where("id", "=", flashcardId).execute();

    return { success: true, message: "Flashcard deleted successfully" };
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return { success: false, message: "Error deleting flashcard", error };
  }
};

export const updateFlashcardPerformance = async (
  userId: string,
  flashcardResults: {
    flashcardId: string;
    isCorrect: boolean;
  }[]
) => {
  try {
    if (!flashcardResults.length) {
      return { success: true, message: "No flashcard results to update" };
    }

    const flashcardIds = flashcardResults.map((result) => result.flashcardId);

    const existingPerformances = await db
      .selectFrom("flashcardPerformance")
      .select([
        "id",
        "flashcardId",
        "correctCount",
        "incorrectCount",
        "timesStudied",
      ])
      .where("userId", "=", userId)
      .where("flashcardId", "in", flashcardIds)
      .execute();

    const performanceMap = new Map();
    existingPerformances.forEach((perf) => {
      performanceMap.set(perf.flashcardId, perf);
    });

    for (const result of flashcardResults) {
      const existingPerformance = performanceMap.get(result.flashcardId);

      await db
        .updateTable("flashcardPerformance")
        .set({
          correctCount: result.isCorrect
            ? existingPerformance.correctCount + 1
            : existingPerformance.correctCount,
          incorrectCount: !result.isCorrect
            ? existingPerformance.incorrectCount + 1
            : existingPerformance.incorrectCount,
          timesStudied: existingPerformance.timesStudied + 1,
          lastStudied: new Date(),
          updatedAt: new Date(),
        })
        .where("id", "=", existingPerformance.id)
        .execute();
    }

    return {
      success: true,
      message: "Flashcard performance updated successfully",
    };
  } catch (error) {
    console.error("Error updating flashcard performance:", error);
    return {
      success: false,
      message: "Error updating flashcard performance",
      error,
    };
  }
};
