import { Plan } from "config/plans";
import { authClient } from "lib/auth-client";
import { createCustomerPortalSession } from "services/subscription.service";
import { getUser } from "services/user.service";

export const createSubscriptionAction = async (
  plan: Plan,
  currentSubscriptionId: string
) => {
  try {
    if (!plan?.name) {
      return { success: false, message: "Invalid plan provided" };
    }

    const { data: user } = await getUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { error } = await authClient.subscription.upgrade({
      plan: plan.name,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/settings?tab=subscription`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/library`,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/settings?tab=subscription`,
      subscriptionId: currentSubscriptionId,
    });

    if (error) {
      console.error("Subscription upgrade failed:", error.message);
      return {
        success: false,
        message: error.message || "Failed to process subscription upgrade",
      };
    }

    return {
      success: true,
      message: "Subscription created successfully",
    };
  } catch (error) {
    console.error("Subscription action error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while processing your subscription";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const cancelSubscriptionAction = async (subscriptionId: string) => {
  try {
    if (!subscriptionId) {
      return { success: false, message: "No subscription ID provided" };
    }

    const { data: user } = await getUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { error } = await authClient.subscription.cancel({
      subscriptionId: subscriptionId,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/settings?tab=subscription`,
    });

    if (error) {
      console.error("Subscription cancellation failed:", error.message);
      return {
        success: false,
        message: error.message || "Failed to cancel subscription",
      };
    }

    return {
      success: true,
      message: "Subscription will be canceled at the end of the billing period",
    };
  } catch (error) {
    console.error("Subscription cancellation error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while canceling your subscription";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const openCustomerPortalAction = async () => {
  const { data: user } = await getUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const { data: customerPortalUrl } = await createCustomerPortalSession();

  if (!customerPortalUrl) {
    return { success: false, message: "Failed to create customer portal URL" };
  }

  window.open(customerPortalUrl.portalUrl, "_blank");

  return {
    success: true,
    message: "Customer portal URL created successfully",
    data: customerPortalUrl.portalUrl,
  };
};
