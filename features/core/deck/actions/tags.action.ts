import {
  addTagToDeck,
  getTagsByDeckId,
  removeTagFromDeck,
} from "@deck/services/tags.service";
import { getUser } from "@user/services/user.service";

export const addTagToDeckAction = async (
  deckId: string,
  tag: string,
  userId: string
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await addTagToDeck(deckId, tag, userId);
    if (result.success) {
      return {
        success: true,
        message: "Tag added successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error adding tag to deck:", error);
    return { success: false, message: "Error adding tag to deck", error };
  }
};

export const removeTagFromDeckAction = async (
  tagId: string,
  deckId: string,
  userId: string
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await removeTagFromDeck(tagId, deckId, userId);
    if (result.success) {
      return {
        success: true,
        message: "Tag removed successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error removing tag from deck:", error);
    return { success: false, message: "Error removing tag from deck", error };
  }
};

export const getTagsByDeckIdAction = async (deckId: string, userId: string) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await getTagsByDeckId(deckId, userId);
    if (result.success) {
      return {
        success: true,
        message: "Tags fetched successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error fetching tags for deck:", error);
    return { success: false, message: "Error fetching tags for deck", error };
  }
};
