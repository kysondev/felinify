"use server";

import { Deck } from "db/types/models.types";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { db } from "lib/db";

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
