import { getUser } from "@user/services/user.service";
import { NewReview } from "db/types/models.types";
import cuid from "cuid";
import { createReview, deleteReview } from "@review/services/review.service";

export const createReviewAction = async (
  deckId: number,
  rating: number,
  description: string | null
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const reviewData: NewReview = {
      id: cuid(),
      userId: user.id,
      deckId,
      rating,
      description: description || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await createReview(reviewData);
    if (result.success) {
      return {
        success: true,
        message: "Review created successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "Error creating review", error };
  }
};

export const deleteReviewAction = async (reviewId: string) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const result = await deleteReview(reviewId, user.id);
    if (result.success) {
      return {
        success: true,
        message: "Review deleted successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, message: "Error deleting review", error };
  }
}; 