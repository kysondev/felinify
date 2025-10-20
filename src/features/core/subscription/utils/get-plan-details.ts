import { plans } from "@subscription/config/plans.config";
import { Subscription } from "db/types/models.types";

export const getPlanDetails = (subscription: Subscription) => {
    if (!subscription || !subscription.plan) {
      return {
        name: "starter",
        limits: {
          decks: 15,
          energy: 10,
        },
      };
    }

    const planInfo = plans.find((plan) => plan.name === subscription.plan);
    return (
      planInfo || {
        name: "starter",
        limits: {
          decks: 15,
          energy: 10,
        },
      }
    );
  };