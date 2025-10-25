"use server";

import { ServiceResult } from "@common/types/service-result.type";
import { Deck } from "db/types/models.types";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import { db } from "src/lib/db";

export const getDeck = async (deckId: number): Promise<ServiceResult<Deck>> => {
  "use cache";
  try {
    const deck = await db
      .selectFrom("deck")
      .selectAll()
      .where("id", "=", deckId)
      .executeTakeFirst();
    return { success: true, data: deck };
  } catch (error) {
    console.error("Error fetching deck:", error);
    return { success: false, message: "Error fetching deck", error };
  }
};

export const getUserDecks = async (
  userId: string
): Promise<ServiceResult<Deck[]>> => {
  "use cache";
  try {
    const decks = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "imageUrl",
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

export const getUserDeckById = async (
  deckId: number,
  userId: string
): Promise<ServiceResult<Deck>> => {
  "use cache";
  try {
    const deck = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "imageUrl",
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
          questionImageUrl:
            flashcard.questionImageUrl ?? flashcard.termImageUrl ?? null,
        };
      });
    }

    return { success: true, data: deck as unknown as Deck };
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    return { success: false, message: "Error fetching deck", error };
  }
};

export const getAllDecks = async (
  page: number = 1,
  limit: number = 12
): Promise<
  ServiceResult<Deck[]> & {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
> => {
  try {
    const offset = (page - 1) * limit;

    const decks = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "description",
        "imageUrl",
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
            questionImageUrl: f.questionImageUrl ?? f.termImageUrl ?? null,
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

export const getFeaturedDecks = async () => {
  try {
    const decks = await db
      .selectFrom("deck")
      .select((eb) => [
        "id",
        "userId",
        "name",
        "imageUrl",
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
        "imageUrl",
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
        "imageUrl",
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
        "imageUrl",
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
