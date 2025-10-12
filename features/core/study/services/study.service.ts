"use server";
import { createUserDeckProgress } from "@deck/services/deck-progress.service";
import cuid from "cuid";
import { NewStudySession, UpdateProgress } from "db/types/models.types";
import { db } from "lib/db";

export const saveStudyProgressToDeck = async (data: UpdateProgress) => {
  try {
    const deckExists = await db
      .selectFrom("deck")
      .select("id")
      .where("id", "=", data.deckId as number)
      .executeTakeFirst();

    if (!deckExists) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    const progressExists = await db
      .selectFrom("userDeckProgress")
      .select("id")
      .where("deckId", "=", data.deckId as number)
      .where("userId", "=", data.userId as string)
      .executeTakeFirst();

    if (!progressExists) {
      const newProgress = await createUserDeckProgress(
        data.userId as string,
        data.deckId as number
      );
      if (!newProgress.success) {
        return newProgress;
      }
    }

    const updatedProgress = await db
      .updateTable("userDeckProgress")
      .set({
        mastery: data.mastery,
        completedSessions: data.completedSessions,
        lastStudied: data.lastStudied,
        updatedAt: new Date(),
      })
      .where("deckId", "=", data.deckId as number)
      .where("userId", "=", data.userId as string)
      .returningAll()
      .executeTakeFirst();

    if (!updatedProgress) {
      return { success: false, message: "Error updating study progress" };
    }

    return { success: true, data: updatedProgress };
  } catch (error) {
    console.error("Error saving study progress to deck:", error);
    return { success: false, message: "Error saving study progress", error };
  }
};

export const saveStudySession = async (data: NewStudySession) => {
  try {
    const newSession = await db
      .insertInto("studySession")
      .values({
        id: cuid(),
        userId: data.userId,
        deckId: data.deckId,
        lengthInSeconds: data.lengthInSeconds || null,
        CreatedAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newSession) {
      return { success: false, message: "Error saving study session" };
    }

    const existingDeck = await db
      .selectFrom("deck")
      .selectAll()
      .where("id", "=", data.deckId as number)
      .executeTakeFirst();

    if (!existingDeck) {
      return { success: false, message: "Deck not found" };
    }

    const updateDeckStudyCount = await db
      .updateTable("deck")
      .set({
        studyCount: existingDeck.studyCount + 1,
      })
      .where("id", "=", data.deckId as number)
      .execute();

    if (!updateDeckStudyCount) {
      return { success: false, message: "Error updating deck study count" };
    }

    const studyTime = data.lengthInSeconds as number;

    const newStudyHour = Math.floor(existingDeck.studyHour + studyTime / 3600);

    const updateDeckStudyHours = await db
      .updateTable("deck")
      .set({
        studyHour: newStudyHour,
      })
      .where("id", "=", data.deckId as number)
      .execute();

    if (!updateDeckStudyHours) {
      return { success: false, message: "Error updating deck study hours" };
    }

    const sumTotalStudyTime = await db
      .selectFrom("studySession")
      .where("userId", "=", data.userId)
      .select((eb) => eb.fn.sum("lengthInSeconds").as("total"))
      .executeTakeFirst();

    const total = Number(sumTotalStudyTime?.total ?? 0);

    const updatedUser = await db
      .updateTable("user")
      .set({
        totalStudyTime: total,
      })
      .where("id", "=", data.userId)
      .execute();

    if (!updatedUser) {
      return { success: false, message: "Error updating user study time" };
    }

    return {
      success: true,
      message: "Study session saved successfully",
      data: newSession,
    };
  } catch (error) {
    console.error("Error saving study session:", error);
    return { success: false, message: "Error saving study session", error };
  }
};

export const updateChallengeCompletionCount = async (
  userId: string,
  deckId: number
) => {
  try {
    const progressExists = await db
      .selectFrom("userDeckProgress")
      .select(["id", "challengeCompleted"])
      .where("deckId", "=", deckId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!progressExists) {
      return {
        success: false,
        message: "Deck progress not found",
      };
    }

    const updatedProgress = await db
      .updateTable("userDeckProgress")
      .set({
        challengeCompleted: (progressExists.challengeCompleted || 0) + 1,
        updatedAt: new Date(),
      })
      .where("deckId", "=", deckId)
      .where("userId", "=", userId)
      .returningAll()
      .executeTakeFirst();

    if (!updatedProgress) {
      return {
        success: false,
        message: "Error updating challenge completion count",
      };
    }

    return { success: true, data: updatedProgress };
  } catch (error) {
    console.error("Error updating challenge completion count:", error);
    return {
      success: false,
      message: "Error updating challenge completion count",
      error,
    };
  }
};
