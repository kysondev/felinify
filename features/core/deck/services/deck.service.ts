"use server";

import { Deck, NewDeck, UpdateDeck } from "db/types/models.types";
import { db } from "lib/db";
import cuid from "cuid";
import { jsonObjectFrom, jsonArrayFrom } from "kysely/helpers/postgres";

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
          question: flashcard.question ?? flashcard.term ?? "",
          answer: flashcard.answer ?? flashcard.definition ?? "",
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

    const normalizedPublicDecks = (decks || []).map((d: any) => ({
      ...d,
      flashcards: d.flashcards
        ? d.flashcards.map((f: any) => ({
            ...f,
            question: f.question ?? f.term ?? "",
            answer: f.answer ?? f.definition ?? "",
          }))
        : [],
    }));

    return {
      success: true,
      data: normalizedPublicDecks as unknown as Deck[],
      pagination: {
        page,
        limit,
        total: totalCount?.count || 0,
        totalPages: Math.ceil((totalCount?.count || 0) / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching all decks:", error);
    throw error;
  }
};
