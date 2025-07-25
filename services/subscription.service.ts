"use server";
import { getUser, getUserWithId } from "./user.service";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCustomerPortalSession = async () => {
  try {
    const { data: user } = await getUser();
    const { data: userWithId } = await getUserWithId(user?.id || "");
    if (!user || !userWithId) {
      return { success: false, message: "Unauthorized" };
    }
    if (!userWithId.stripeCustomerId) {
      return { success: false, message: "No Stripe customer found" };
    }

    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: userWithId.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/settings?tab=subscription`,
    });

    return {
      success: true,
      message: "Customer portal session created successfully",
      data: {
        portalUrl: portalSession.url,
      },
    };
  } catch (error) {
    console.error("Stripe customer portal error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while creating customer portal session";
    return {
      success: false,
      message: errorMessage,
    };
  }
};
