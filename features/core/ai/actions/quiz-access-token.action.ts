"use server";

import { getDeckById } from "@deck/services/deck.service";
import {
  createQuizAccessToken,
  validateQuizAccessToken,
} from "@study/services/quiz-access-token.service";
import {
  getUser,
  getUserEnergy,
  updateUserEnergy,
} from "@user/services/user.service";

export const createQuizAccessTokenAction = async (
  deckId: number,
  numQuestions: number
) => {
  try {
    const userResult = await getUser();
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    if (!userResult.data.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const userId = userResult.data.id;

    const deckResult = await getDeckById(deckId, userId);
    if (!deckResult.success || !deckResult.data) {
      return {
        success: false,
        message: "Deck not found",
      };
    }

    const deck = deckResult.data;

    if (!deck.flashcards || deck.flashcards.length < 10) {
      return {
        success: false,
        message: "Deck must have at least 10 flashcards",
      };
    }

    if (!deck.progress || deck.progress.mastery < 10) {
      return {
        success: false,
        message: "You need at least 10% mastery in this deck",
      };
    }

    if (!deck.progress || (deck.progress.challengeCompleted || 0) < 3) {
      return {
        success: false,
        message: "Complete Challenge Mode at least 3 times first",
      };
    }

    const tokenResult = await createQuizAccessToken(
      userId,
      deckId,
      numQuestions
    );
    if (!tokenResult.success) {
      return {
        success: false,
        message: tokenResult.message || "Failed to create access token",
      };
    }

    const userEnergy = await getUserEnergy(userId);

    if (userEnergy <= 0) {
      return {
        success: false,
        message: "You don't have enough energy to generate flashcards",
      };
    }

    const updatedEnergy = await updateUserEnergy(userId, userEnergy - 1);

    if (!updatedEnergy.success) {
      return {
        success: false,
        message: updatedEnergy.message || "Failed to update user energy",
      };
    }

    return {
      success: true,
      token: tokenResult.data?.token,
      numQuestions: tokenResult.data?.numQuestions,
    };
  } catch (error) {
    console.error("Error creating quiz access token:", error);
    return {
      success: false,
      message: "Error creating quiz access token",
    };
  }
};

export const validateQuizAccessTokenAction = async (
  token: string,
  deckId: number
) => {
  try {
    const userResult = await getUser();
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!userResult.data.emailVerified) {
      return { success: false, message: "Email not verified" };
    }

    const userId = userResult.data.id;

    const validationResult = await validateQuizAccessToken(
      token,
      userId,
      deckId
    );
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.message || "Invalid access token",
      };
    }

    return {
      success: true,
      numQuestions: validationResult.data?.numQuestions || 10,
    };
  } catch (error) {
    console.error("Error validating quiz access token:", error);
    return {
      success: false,
      message: "Error validating quiz access token",
    };
  }
};
