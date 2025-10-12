"use server";

import cuid from "cuid";
import { db } from "lib/db";

export const createUserDeckProgress = async (
  userId: string,
  deckId: number
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
