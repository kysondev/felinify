"use server";

import { Deck, NewDeck } from "db/types/models.types";
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        lastStudied: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
