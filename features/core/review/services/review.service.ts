"use server";
import { NewReview } from "db/types/models.types";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { db } from "lib/db";

export const createReview = async (reviewData: NewReview) => {
  try {
    const existingReview = await db
      .selectFrom("review")
      .selectAll()
      .where("userId", "=", reviewData.userId)
      .where("deckId", "=", reviewData.deckId)
      .executeTakeFirst();

    if (existingReview) {
      return { success: false, message: "You have already reviewed this deck" };
    }

    const newReview = await db
      .insertInto("review")
      .values(reviewData)
      .returningAll()
      .executeTakeFirst();

    if (!newReview) {
      return { success: false, message: "Error creating review" };
    }

    const deck = await db
      .selectFrom("deck")
      .selectAll()
      .where("id", "=", reviewData.deckId)
      .executeTakeFirst();

    if (!deck) {
      return { success: false, message: "Deck not found" };
    }

    const reviews = await db
      .selectFrom("review")
      .selectAll()
      .where("deckId", "=", reviewData.deckId)
      .execute();

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    const updatedDeck = await db
      .updateTable("deck")
      .set({
        rating: Math.floor((totalRating / reviews.length) * 10) / 10,
      })
      .where("id", "=", reviewData.deckId)
      .executeTakeFirst();

    if (!updatedDeck) {
      return { success: false, message: "Error updating deck" };
    }

    return { success: true, data: reviewData };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "Error creating review", error };
  }
};

export const deleteReview = async (reviewId: string, userId: string) => {
  try {
    const review = await db
      .selectFrom("review")
      .selectAll()
      .where("id", "=", reviewId)
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!review) {
      return {
        success: false,
        message: "Review not found or you don't have permission to delete it",
      };
    }

    const deletedReview = await db
      .deleteFrom("review")
      .where("id", "=", reviewId)
      .returningAll()
      .executeTakeFirst();

    if (!deletedReview) {
      return { success: false, message: "Error deleting review" };
    }

    const reviews = await db
      .selectFrom("review")
      .selectAll()
      .where("deckId", "=", review.deckId)
      .execute();

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const newRating =
      reviews.length > 0
        ? Math.floor((totalRating / reviews.length) * 10) / 10
        : 0;

    const updatedDeck = await db
      .updateTable("deck")
      .set({
        rating: newRating,
      })
      .where("id", "=", review.deckId)
      .executeTakeFirst();

    if (!updatedDeck) {
      return { success: false, message: "Error updating deck rating" };
    }

    return { success: true, data: deletedReview };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, message: "Error deleting review", error };
  }
};

export const getReviewsByDeckId = async (deckId: number) => {
  try {
    const reviews = await db
      .selectFrom("review")
      .select((eb) => [
        "id",
        "userId",
        "deckId",
        "description",
        "createdAt",
        "updatedAt",
        "rating",

        jsonObjectFrom(
          eb
            .selectFrom("user")
            .selectAll()
            .whereRef("user.id", "=", "review.userId")
        ).as("user"),
      ])
      .where("deckId", "=", deckId)
      .execute();

    return { success: true, data: reviews };
  } catch (error) {
    console.error("Error fetching reviews by deck ID:", error);
    return { success: false, message: "Error fetching reviews", error };
  }
};
