"use server";

import { ServiceResult } from "@common/types/service-result.type";
import { generateDeckId } from "@common/utils/deck-id.utils";
import cuid from "cuid";
import { Deck } from "db/types/models.types";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { db } from "lib/db";

export const cloneDeck = async (
    deckId: number,
    userId: string
  ): Promise<ServiceResult<Deck>> => {
    try {
      const originalDeck = await db
        .selectFrom("deck")
        .select((eb) => [
          "id",
          "name",
          "description",
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
        .where("id", "=", deckId)
        .executeTakeFirst();
  
      if (!originalDeck) {
        return {
          success: false,
          message: "Deck not found or not available for cloning",
        };
      }
  
      const newDeckId = generateDeckId();
      const clonedDeck = await db
        .insertInto("deck")
        .values({
          id: newDeckId,
          name: `${originalDeck.name} (Copy)`,
          description: originalDeck.description,
          userId: userId,
          rating: 0,
          studyCount: 0,
          studyHour: 0,
          visibility: "private",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returningAll()
        .executeTakeFirst();
  
      if (!clonedDeck) {
        return { success: false, message: "Error creating cloned deck" };
      }
  
      await db
        .insertInto("userDeckProgress")
        .values({
          id: cuid(),
          userId: userId,
          deckId: clonedDeck.id,
          mastery: 0,
          completedSessions: 0,
          challengeCompleted: 0,
          lastStudied: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .execute();
  
      if (originalDeck.flashcards && originalDeck.flashcards.length > 0) {
        const flashcardsToInsert = originalDeck.flashcards.map(
          (flashcard: any) => ({
            id: cuid(),
            deckId: clonedDeck.id,
            term: flashcard.term || "",
            definition: flashcard.definition || "",
            termImageUrl: flashcard.termImageUrl || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        );
  
        await db.insertInto("flashcard").values(flashcardsToInsert).execute();
      }
  
      if (originalDeck.tags && originalDeck.tags.length > 0) {
        const tagsToInsert = originalDeck.tags.map((tag: any) => ({
          id: cuid(),
          deckId: clonedDeck.id,
          name: tag.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
  
        await db.insertInto("tag").values(tagsToInsert).execute();
      }
  
      return { success: true, data: clonedDeck };
    } catch (error) {
      console.error("Error cloning deck:", error);
      return { success: false, message: "Error cloning deck", error };
    }
  };
  