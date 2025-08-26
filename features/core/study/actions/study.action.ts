import {
  saveStudyProgressToDeck,
  saveStudySession,
  updateChallengeCompletionCount,
} from "@study/services/study.service";
import { getUser } from "@user/services/user.service";
import { NewStudySession, UpdateProgress } from "db/types/models.types";

export const saveStudyProgressAction = async (data: UpdateProgress) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const { success, message } = await saveStudyProgressToDeck(
      data as UpdateProgress
    );
    if (success) {
      return {
        success: true,
        message: "Study progress saved successfully",
      };
    } else {
      return { success: false, message: message };
    }
  } catch (error) {
    console.error("Error saving study progress:", error);
    return { success: false, message: "Error saving study progress", error };
  }
};

export const saveStudySessionAction = async (data: NewStudySession) => {
  try {
    const { data: user } = await getUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!user.emailVerified) {
      return { success: false, message: "Email not verified" };
    }
    const result = await saveStudySession(data);

    if (result.success) {
      return {
        success: true,
        message: "Study session started successfully",
        data: result.data,
      };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error starting study session:", error);
    return { success: false, message: "Error starting study session", error };
  }
};

export const updateChallengeCompletionAction = async (
  userId: string,
  deckId: string
) => {
  try {
    const result = await updateChallengeCompletionCount(userId, deckId);
    return result;
  } catch (error) {
    console.error("Error updating challenge completion count:", error);
    return {
      success: false,
      message: "Error updating challenge completion count",
    };
  }
};
