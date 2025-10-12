import { Plan } from "@subscription/config/plans.config";
import { authClient } from "@auth/auth-client";
import { createCustomerPortalSession } from "@subscription/services/subscription.service";
import { getUser } from "@user/services/user.service";

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
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=subscription`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=subscription`,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=subscription`,
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

export const openCustomerPortalAction = async () => {
  const { data: user } = await getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const { data: customerPortalUrl } = await createCustomerPortalSession();

  if (!customerPortalUrl) {
    return { success: false, message: "Failed to create customer portal URL" };
  }

  window.location.assign(customerPortalUrl.portalUrl);
};
