"use server";

import { ServiceResult } from "@common/types/service-result.type";
import { generateDeckId } from "@common/utils/deck-id.utils";
import cuid from "cuid";
import { Deck, NewDeck, UpdateDeck } from "db/types/models.types";
import { db } from "lib/db";

export const createDeck = async (
    deckData: NewDeck
  ): Promise<ServiceResult<Deck>> => {
    try {
      const newDeckId = generateDeckId();
      const newDeck = await db
        .insertInto("deck")
        .values({
          id: newDeckId,
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
  
  export const updateDeck = async (
    deckData: UpdateDeck
  ): Promise<ServiceResult<Deck>> => {
    try {
      const deckExists = await db
        .selectFrom("deck")
        .select("id")
        .where("id", "=", deckData.id as number)
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
        .where("id", "=", deckData.id as number)
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