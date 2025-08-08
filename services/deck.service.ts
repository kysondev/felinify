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

export const getFeaturedDecks = async () => {
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
        "rating",
        "studyCount",
        "studyHour",
        "visibility",
        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),
        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),
      ])
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .orderBy("createdAt", "desc")
      .execute();

    return { success: true, data: decks as unknown as Deck[] };
  } catch (error) {
    console.error("Error fetching featured decks:", error);
    throw error;
  }
};

export const getPopularDecks = async () => {
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
        "rating",
        "visibility",
        "studyCount",
        "studyHour",

        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),
        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),
      ])
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .orderBy("studyCount", "desc")
      .execute();

    return { success: true, data: decks as unknown as Deck[] };
  } catch (error) {
    console.error("Error fetching popular decks:", error);
    throw error;
  }
};

export const getDecksByUserId = async (userId: string) => {
  "use cache";
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
        "rating",
        "visibility",
        "studyCount",
        "studyHour",

        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),

        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),

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
  "use cache";
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
        "rating",
        "visibility",
        "studyCount",
        "studyHour",

        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),

        jsonArrayFrom(
          eb
            .selectFrom("review")
            .selectAll()
            .whereRef("review.deckId", "=", "deck.id")
        ).as("reviews"),

        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),

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
        .select(["flashcardId", "correctCount", "incorrectCount"])
        .where("userId", "=", userId)
        .where("flashcardId", "in", flashcardIds)
        .execute();

      const performanceMap = new Map();
      performances.forEach((perf) => {
        performanceMap.set(perf.flashcardId, {
          numCorrect: perf.correctCount,
          numIncorrect: perf.incorrectCount,
        });
      });

      deck.flashcards = deck.flashcards.map((flashcard: any) => {
        const performance = performanceMap.get(flashcard.id) || {
          numCorrect: 0,
          numIncorrect: 0,
        };
        return {
          ...flashcard,
          numCorrect: performance.numCorrect,
          numIncorrect: performance.numIncorrect,
        };
      });
    }

    return { success: true, data: deck };
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    return { success: false, message: "Error fetching deck", error };
  }
};

export const getReviewsByDeckId = async (deckId: string) => {
  try {
    const reviews = await db
      .selectFrom("review")
      .select((eb) => [
        "id",
        "userId",
        "deckId",
        "description",
        "createdAt",
        "updatedAt",
        "rating",

        jsonObjectFrom(
          eb
            .selectFrom("user")
            .selectAll()
            .whereRef("user.id", "=", "review.userId")
        ).as("user"),
      ])
      .where("deckId", "=", deckId)
      .execute();

    return { success: true, data: reviews };
  } catch (error) {
    console.error("Error fetching reviews by deck ID:", error);
    return { success: false, message: "Error fetching reviews", error };
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
        rating: 0,
        studyCount: 0,
        studyHour: 0,
        visibility: deckData.visibility || "public",
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
        ...(deckData.visibility && { visibility: deckData.visibility }),
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
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    const progressExists = await db
      .selectFrom("userDeckProgress")
      .select("id")
      .where("deckId", "=", data.deckId as string)
      .where("userId", "=", data.userId as string)
      .executeTakeFirst();

    if (!progressExists) {
      const newProgress = await createUserDeckProgress(
        data.userId as string,
        data.deckId as string
      );
      if (!newProgress.success) {
        return newProgress;
      }
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

export const createUserDeckProgress = async (
  userId: string,
  deckId: string
) => {
  try {
    const newProgress = await db
      .insertInto("userDeckProgress")
      .values({
        id: cuid(),
        userId: userId,
        deckId: deckId,
        mastery: 0,
        completedSessions: 0,
        challengeCompleted: 0,
        lastStudied: null,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newProgress) {
      return { success: false, message: "Error creating deck progress" };
    }

    return { success: true, data: newProgress };
  } catch (error) {
    console.error("Error creating user deck progress:", error);
    return { success: false, message: "Error creating deck progress", error };
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

    const existingDeck = await db
      .selectFrom("deck")
      .selectAll()
      .where("id", "=", data.deckId as string)
      .executeTakeFirst();

    if (!existingDeck) {
      return { success: false, message: "Deck not found" };
    }

    const updateDeckStudyCount = await db
      .updateTable("deck")
      .set({
        studyCount: existingDeck.studyCount + 1,
      })
      .where("id", "=", data.deckId as string)
      .execute();

    if (!updateDeckStudyCount) {
      return { success: false, message: "Error updating deck study count" };
    }

    const studyTime = data.lengthInSeconds as number;

    const newStudyHour = Math.floor(existingDeck.studyHour + studyTime / 3600);

    const updateDeckStudyHours = await db
      .updateTable("deck")
      .set({
        studyHour: newStudyHour,
      })
      .where("id", "=", data.deckId as string)
      .execute();

    if (!updateDeckStudyHours) {
      return { success: false, message: "Error updating deck study hours" };
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

export const updateChallengeCompletionCount = async (
  userId: string,
  deckId: string
) => {
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
      return {
        success: false,
        message: "Error updating challenge completion count",
      };
    }

    return { success: true, data: updatedProgress };
  } catch (error) {
    console.error("Error updating challenge completion count:", error);
    return {
      success: false,
      message: "Error updating challenge completion count",
      error,
    };
  }
};

export const createQuizAccessToken = async (
  userId: string,
  deckId: string,
  numQuestions: number
) => {
  try {
    const deck = await db
      .selectFrom("deck")
      .select(["id", "userId", "visibility"])
      .where("id", "=", deckId)
      .executeTakeFirst();

    if (!deck) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    if (deck.visibility !== "public" && deck.userId !== userId) {
      return {
        success: false,
        message: "You don't have permission to access this deck",
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
        numQuestions,
      },
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
        numQuestions: accessToken.numQuestions,
      },
    };
  } catch (error) {
    console.error("Error validating quiz access token:", error);
    return { success: false, message: "Error validating access token", error };
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

export const getDecksBySearch = async (searchQuery: string) => {
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
        "rating",
        "studyCount",
        "studyHour",
        "visibility",
        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),
      ])
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .where((eb) =>
        eb.or([
          eb("name", "ilike", `%${searchQuery}%`),
          eb("description", "ilike", `%${searchQuery}%`),
        ])
      )
      .orderBy("studyCount", "desc")
      .orderBy("createdAt", "desc")
      .execute();

    return { success: true, data: decks as unknown as Deck[] };
  } catch (error) {
    console.error("Error searching decks:", error);
    throw error;
  }
};

export const addTagToDeck = async (
  deckId: string,
  tag: string,
  userId: string
) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return { success: false, message: "Deck not found or you don't have permission to add tags" };
    }

    const newTag = await db
      .insertInto("tag")
      .values({
        id: cuid(),
        name: tag,
        deckId: deckId,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newTag) {
      return { success: false, message: "Error adding tag to deck" };
    }

    return { success: true, data: newTag };
  } catch (error) {
    console.error("Error adding tag to deck:", error);
    return { success: false, message: "Error adding tag to deck", error };
  }
};

export const removeTagFromDeck = async (
  tagId: string,
  deckId: string,
  userId: string
) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return { success: false, message: "Deck not found or you don't have permission to remove tags" };
    }

    const deletedTag = await db
      .deleteFrom("tag")
      .where("id", "=", tagId)
      .where("deckId", "=", deckId)
      .returningAll()
      .executeTakeFirst();

    if (!deletedTag) {
      return { success: false, message: "Tag not found or could not be removed" };
    }

    return { success: true, data: deletedTag };
  } catch (error) {
    console.error("Error removing tag from deck:", error);
    return { success: false, message: "Error removing tag from deck", error };
  }
};

export const getTagsByDeckId = async (deckId: string, userId: string) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!deckExists) {
      return { success: false, message: "Deck not found or you don't have permission to view tags" };
    }

    const tags = await db
      .selectFrom("tag")
      .selectAll()
      .where("deckId", "=", deckId)
      .orderBy("name", "asc")
      .execute();

    return { success: true, data: tags };
  } catch (error) {
    console.error("Error fetching tags for deck:", error);
    return { success: false, message: "Error fetching tags for deck", error };
  }
};

export const getDecksByTag = async (tagName: string) => {
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
        "rating",
        "studyCount",
        "studyHour",
        "visibility",
        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),
        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),
      ])
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("tag")
            .select("id")
            .whereRef("tag.deckId", "=", eb.ref("deck.id"))
            .where("tag.name", "=", tagName)
        )
      )
      .orderBy("studyCount", "desc")
      .orderBy("createdAt", "desc")
      .execute();

    return { success: true, data: decks as unknown as Deck[] };
  } catch (error) {
    console.error("Error fetching decks by tag:", error);
    throw error;
  }
};

export const getAllDecks = async (page: number = 1, limit: number = 12) => {
  try {
    const offset = (page - 1) * limit;
    
    const decks = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "description",
        "createdAt",
        "updatedAt",
        "rating",
        "studyCount",
        "studyHour",
        "visibility",
        jsonArrayFrom(
          eb
            .selectFrom("flashcard")
            .selectAll()
            .whereRef("flashcard.deckId", "=", "deck.id")
        ).as("flashcards"),
        jsonArrayFrom(
          eb
            .selectFrom("tag")
            .selectAll()
            .whereRef("tag.deckId", "=", "deck.id")
        ).as("tags"),
      ])
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .orderBy("createdAt", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    const totalCount = await db
      .selectFrom("deck")
      .select((eb) => eb.fn.count<number>("id").as("count"))
      .where("visibility", "=", "public")
      .where((eb) =>
        eb.exists(
          db
            .selectFrom("flashcard")
            .select("id")
            .whereRef("flashcard.deckId", "=", eb.ref("deck.id"))
        )
      )
      .executeTakeFirst();

    return { 
      success: true, 
      data: decks as unknown as Deck[],
      pagination: {
        page,
        limit,
        total: totalCount?.count || 0,
        totalPages: Math.ceil((totalCount?.count || 0) / limit)
      }
    };
  } catch (error) {
    console.error("Error fetching all decks:", error);
    throw error;
  }
};