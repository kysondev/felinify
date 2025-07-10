import { createDeck } from "services/deck.service";

export const createDeckAction = async (
  userId: string,
  name: string,
  description?: string
) => {
  const result = await createDeck({
    name: name as string,
    userId: userId,
    description: description as string,
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
};
