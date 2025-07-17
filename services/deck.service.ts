"use server";

import {
  Deck,
  NewDeck,
  NewFlashcard,
  NewStudySession,
  UpdateDeck,
  UpdateFlashcard,
  UpdateProgress,
} from "db/types/models.types";
import { db } from "lib/db";
import cuid from "cuid";
import { jsonObjectFrom, jsonArrayFrom } from "kysely/helpers/postgres";

export const getDecksByUserId = async (userId: string) => {
  try {
    const decks = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "description",
        "createdAt",
        "updatedAt",

        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),

        jsonObjectFrom(
          eb
            .selectFrom("userDeckProgress")
            .selectAll()
            .whereRef("userDeckProgress.deckId", "=", "deck.id")
            .where("userDeckProgress.userId", "=", userId)
        ).as("progress"),
      ])
      .where("userId", "=", userId)
      .orderBy("createdAt", "desc")
      .execute();

    return { success: true, data: decks as unknown as Deck[] };
  } catch (error) {
    console.error("Error fetching decks by userId:", error);
    throw error;
  }
};

export const getDeckById = async (deckId: string, userId: string) => {
  try {
    const deck = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "description",
        "createdAt",
        "updatedAt",

        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),

        jsonObjectFrom(
          eb
            .selectFrom("userDeckProgress")
            .selectAll()
            .whereRef("userDeckProgress.deckId", "=", "deck.id")
            .where("userDeckProgress.userId", "=", userId)
        ).as("progress"),
      ])
      .where("id", "=", deckId)
      .executeTakeFirst();

    if (!deck) {
      return { success: false, message: "Deck not found" };
    }

    if (deck.flashcards && deck.flashcards.length > 0) {
      const flashcardIds = deck.flashcards.map((f: any) => f.id);
      
      const performances = await db
        .selectFrom("flashcardPerformance")
        .select([
          "flashcardId",
          "correctCount",
          "incorrectCount"
        ])
        .where("userId", "=", userId)
        .where("flashcardId", "in", flashcardIds)
        .execute();

      const performanceMap = new Map();
      performances.forEach(perf => {
        performanceMap.set(perf.flashcardId, {
          numCorrect: perf.correctCount,
          numIncorrect: perf.incorrectCount
        });
      });

      deck.flashcards = deck.flashcards.map((flashcard: any) => {
        const performance = performanceMap.get(flashcard.id) || { numCorrect: 0, numIncorrect: 0 };
        return {
          ...flashcard,
          numCorrect: performance.numCorrect,
          numIncorrect: performance.numIncorrect
        };
      });
    }

    return { success: true, data: deck };
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    return { success: false, message: "Error fetching deck", error };
  }
};

export const createDeck = async (deckData: NewDeck) => {
  try {
    const newDeck = await db
      .insertInto("deck")
      .values({
        id: cuid(),
        name: deckData.name,
        description: deckData.description || null,
        userId: deckData.userId,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newDeck) {
      return { success: false, message: "Error creating deck" };
    }

    const newDeckProgress = await db
      .insertInto("userDeckProgress")
      .values({
        id: cuid(),
        userId: newDeck.userId,
        deckId: newDeck.id,
        mastery: 0,
        completedSessions: 0,
        challengeCompleted: 0,
        lastStudied: null,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .execute();

    if (!newDeckProgress) {
      return { success: false, message: "Error creating deck progress" };
    }

    return { success: true, data: newDeck };
  } catch (error) {
    console.error("Error creating deck and progress:", error);
    return { success: false, message: "Error creating deck", error };
  }
};

export const updateDeck = async (deckData: UpdateDeck) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckData.id as string)
      .where("userId", "=", deckData.userId as string)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found or you don't have permission to update it",
      };
    }

    const updatedDeck = await db
      .updateTable("deck")
      .set({
        ...(deckData.name && { name: deckData.name }),
        ...(deckData.description !== undefined && {
          description: deckData.description,
        }),
        updatedAt: new Date(),
      })
      .where("id", "=", deckData.id as string)
      .returningAll()
      .executeTakeFirst();

    if (!updatedDeck) {
      return { success: false, message: "Error updating deck" };
    }

    return { success: true, data: updatedDeck };
  } catch (error) {
    console.error("Error updating deck:", error);
    return { success: false, message: "Error updating deck", error };
  }
};

export const deleteDeck = async (deckId: string, userId: string) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found or you don't have permission to delete it",
      };
    }

    const deletedDeck = await db
      .deleteFrom("deck")
      .where("id", "=", deckId)
      .returningAll()
      .executeTakeFirst();

    if (!deletedDeck) {
      return { success: false, message: "Error deleting deck" };
    }

    return { success: true, data: deletedDeck };
  } catch (error) {
    console.error("Error deleting deck:", error);
    return { success: false, message: "Error deleting deck", error };
  }
};

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

export const saveStudyProgressToDeck = async (data: UpdateProgress) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", data.deckId as string)
      .where("userId", "=", data.userId as string)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found or you don't have permission to update it",
      };
    }

    const updatedProgress = await db
      .updateTable("userDeckProgress")
      .set({
        mastery: data.mastery,
        completedSessions: data.completedSessions,
        lastStudied: data.lastStudied,
        updatedAt: new Date(),
      })
      .where("deckId", "=", data.deckId as string)
      .where("userId", "=", data.userId as string)
      .returningAll()
      .executeTakeFirst();

    if (!updatedProgress) {
      return { success: false, message: "Error updating study progress" };
    }

    return { success: true, data: updatedProgress };
  } catch (error) {
    console.error("Error saving study progress to deck:", error);
    return { success: false, message: "Error saving study progress", error };
  }
};

export const saveStudySession = async (data: NewStudySession) => {
  try {
    const newSession = await db
      .insertInto("studySession")
      .values({
        id: cuid(),
        userId: data.userId,
        deckId: data.deckId,
        lengthInSeconds: data.lengthInSeconds || null,
        CreatedAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newSession) {
      return { success: false, message: "Error saving study session" };
    }

    const sumTotalStudyTime = await db
      .selectFrom("studySession")
      .where("userId", "=", data.userId)
      .select((eb) => eb.fn.sum("lengthInSeconds").as("total"))
      .executeTakeFirst();

    const total = Number(sumTotalStudyTime?.total ?? 0);

    const updatedUser = await db
      .updateTable("user")
      .set({
        totalStudyTime: total,
      })
      .where("id", "=", data.userId)
      .execute();

    if (!updatedUser) {
      return { success: false, message: "Error updating user study time" };
    }

    return {
      success: true,
      message: "Study session saved successfully",
      data: newSession,
    };
  } catch (error) {
    console.error("Error saving study session:", error);
    return { success: false, message: "Error saving study session", error };
  }
};

export const updateChallengeCompletionCount = async (userId: string, deckId: string) => {
  try {
    const progressExists = await db
      .selectFrom("userDeckProgress")
      .select(["id", "challengeCompleted"])
      .where("deckId", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!progressExists) {
      return {
        success: false,
        message: "Deck progress not found",
      };
    }

    const updatedProgress = await db
      .updateTable("userDeckProgress")
      .set({
        challengeCompleted: (progressExists.challengeCompleted || 0) + 1,
        updatedAt: new Date(),
      })
      .where("deckId", "=", deckId)
      .where("userId", "=", userId)
      .returningAll()
      .executeTakeFirst();

    if (!updatedProgress) {
      return { success: false, message: "Error updating challenge completion count" };
    }

    return { success: true, data: updatedProgress };
  } catch (error) {
    console.error("Error updating challenge completion count:", error);
    return { success: false, message: "Error updating challenge completion count", error };
  }
};

export const createQuizAccessToken = async (
  userId: string,
  deckId: string,
  numQuestions: number
) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found or you don't have permission to access it",
      };
    }

    await db
      .deleteFrom("quizAccessToken")
      .where("userId", "=", userId)
      .where("deckId", "=", deckId)
      .where("used", "=", false)
      .execute();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const tokenString = cuid();

    const newToken = await db
      .insertInto("quizAccessToken")
      .values({
        id: cuid(),
        token: tokenString,
        userId,
        deckId,
        numQuestions,
        used: false,
        expiresAt,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newToken) {
      return { success: false, message: "Error creating access token" };
    }

    return { 
      success: true, 
      data: {
        token: tokenString,
        numQuestions
      }
    };
  } catch (error) {
    console.error("Error creating quiz access token:", error);
    return { success: false, message: "Error creating access token", error };
  }
};

export const validateQuizAccessToken = async (
  token: string,
  userId: string,
  deckId: string
) => {
  try {
    
    const accessToken = await db
      .selectFrom("quizAccessToken")
      .selectAll()
      .where("token", "=", token)
      .where("userId", "=", userId)
      .where("deckId", "=", deckId)
      .where("used", "=", false)
      .where("expiresAt", ">", new Date())
      .executeTakeFirst();

    if (!accessToken) {
      return { success: false, message: "Invalid or expired access token" };
    }

    await db
      .updateTable("quizAccessToken")
      .set({ used: true, updatedAt: new Date() })
      .where("id", "=", accessToken.id)
      .execute();

    return { 
      success: true, 
      data: {
        numQuestions: accessToken.numQuestions
      }
    };
  } catch (error) {
    console.error("Error validating quiz access token:", error);
    return { success: false, message: "Error validating access token", error };
  }
};
