import { Deck, UpdateDeck } from "db/types/models.types";
import { getUser, getUserSubscription } from "@user/services/user.service";
import { hasReachedMaxDeck } from "@subscription/utils/limits";
import { createDeck, updateDeck } from "@deck/services/deck-write.service";
import { deleteDeck } from "@deck/services/deck-delete.service";
import { getUserDecks } from "@deck/services/deck-read.service";
import { cloneDeck } from "@deck/services/deck-clone.service";

export const createDeckAction = async (
  userId: string,
  name: string,
  description?: string,
  visibility?: "public" | "private"
) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await createDeck({
      name: name as string,
      userId: userId,
      description: description as string,
      visibility: visibility || "public",
      rating: 0,
      studyCount: 0,
      studyHour: 0,
    });
    if (result.success) {
      return {
        success: true,
        message: "Deck created successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error creating deck:", error);
    return { success: false, message: "Error creating deck", error };
  }
};

export const updateDeckAction = async (deckData: UpdateDeck) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await updateDeck(deckData);
    if (result.success) {
      return {
        success: true,
        message: "Deck updated successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error updating deck:", error);
    return { success: false, message: "Error updating deck", error };
  }
};

export const deleteDeckAction = async (deckId: number, userId: string) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await deleteDeck(deckId, userId);
    if (result.success) {
      return {
        success: true,
        message: "Deck deleted successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error deleting deck:", error);
    return { success: false, message: "Error deleting deck", error };
  }
};

export const cloneDeckAction = async (deckId: number) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const { data: subscription } = await getUserSubscription(user.id);

    const { data: decks } = await getUserDecks(user.id);
    
    const hasReachedLimit = hasReachedMaxDeck(subscription?.plan as "pro" | "ultra" | "starter", decks as Deck[]);

    if (hasReachedLimit) {
      return { success: false, message: "You have reached the limit of decks you can create." };
    }
    
    const result = await cloneDeck(deckId, user.id);
    if (result.success) {
      return {
        success: true,
        message: "Deck cloned successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error cloning deck:", error);
    return { success: false, message: "Error cloning deck", error };
  }
};
