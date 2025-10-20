"use server";

import { ServiceResult } from "@common/types/service-result.type";
import { Deck } from "db/types/models.types";
import { db } from "lib/db";

export const deleteDeck = async (
    deckId: number,
    userId: string
  ): Promise<ServiceResult<Deck>> => {
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