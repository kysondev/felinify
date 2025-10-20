"use server";
import cuid from "cuid";
import { db } from "src/lib/db";

export const createQuizAccessToken = async (
  userId: string,
  deckId: number,
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
  deckId: number
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
