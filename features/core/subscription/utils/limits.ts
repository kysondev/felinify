import { plans } from "@subscription/config/plans.config";
import { Deck } from "db/types/models.types";

export const hasReachedMaxDeck = (
  subscription: "starter" | "pro" | "ultra",
  decks: Deck[]
) => {
  switch (subscription) {
    case "starter":
      return decks.length === plans.find((plan) => plan.name === "starter")!.limits.decks;
    case "pro":
      return (
        decks.length === plans.find((plan) => plan.name === "pro")!.limits.decks
      );
    case "ultra":
      return (
        decks.length ===
        plans.find((plan) => plan.name === "ultra")!.limits.decks
      );
    default:
      return decks.length === plans.find((plan) => plan.name === "starter")!.limits.decks;
  }
};
