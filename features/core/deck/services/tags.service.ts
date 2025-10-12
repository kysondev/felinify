"use server";
import cuid from "cuid";
import { db } from "lib/db";

export const addTagToDeck = async (
  deckId: number,
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
      return {
        success: false,
        message: "Deck not found or you don't have permission to add tags",
      };
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
  deckId: number,
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
      return {
        success: false,
        message: "Deck not found or you don't have permission to remove tags",
      };
    }

    const deletedTag = await db
      .deleteFrom("tag")
      .where("id", "=", tagId)
      .where("deckId", "=", deckId)
      .returningAll()
      .executeTakeFirst();

    if (!deletedTag) {
      return {
        success: false,
        message: "Tag not found or could not be removed",
      };
    }

    return { success: true, data: deletedTag };
  } catch (error) {
    console.error("Error removing tag from deck:", error);
    return { success: false, message: "Error removing tag from deck", error };
  }
};

export const getTagsByDeckId = async (deckId: number, userId: string) => {
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
        message: "Deck not found or you don't have permission to view tags",
      };
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
