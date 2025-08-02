"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import { UpgradePlanDialog } from "components/study/dialogs/UpgradePlanDialog";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import { User } from "db/types/models.types";
import { plans } from "config/plans.config";
import { authClient } from "lib/auth-client";
import { CalendarIcon } from "lucide-react";
import { openCustomerPortalAction } from "actions/subscription.action";
import { Loading } from "components/ui/Loading";

export function SubscriptionSettings({ user }: { user: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [planName, setPlanName] = useState<string>("Starter");
  const [loading, setLoading] = useState(true);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<
    string | undefined
  >(undefined);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const [isCanceled, setIsCanceled] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const getPlanDetails = () => {
    if (planName === "Starter") {
      return {
        name: "Starter",
        limits: {
          decks: 15,
          energy: 10,
        },
      };
    }

    const planInfo = plans.find((plan) => plan.name === planName);
    return (
      planInfo || {
        name: "Starter",
        limits: {
          decks: 15,
          energy: 10,
        },
      }
    );
  };

  const planDetails = getPlanDetails();
  const isPaidPlan = planName !== "Starter";

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: subscriptions } = await authClient.subscription.list({
          query: { referenceId: user.id },
        });
        if (subscriptions) {
          setPlanName(subscriptions[0] ? subscriptions[0].plan : "Starter");
          setStripeSubscriptionId(
            subscriptions[0] ? subscriptions[0].stripeSubscriptionId : undefined
          );
          setIsCanceled(subscriptions[0]?.cancelAtPeriodEnd ? true : false);

          if (subscriptions[0] && subscriptions[0].periodEnd) {
            setNextBillingDate(
              new Date(subscriptions[0].periodEnd).toLocaleDateString()
            );
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  useEffect(() => {
    const shouldOpenDialog = searchParams.has("openUpgradeDialog");
    if (shouldOpenDialog) {
      setIsDialogOpen(true);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("openUpgradeDialog");
      newUrl.searchParams.delete("tab");

      router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    }
  }, [searchParams, router]);

  const handleOpenCustomerPortal = async () => {
    setPortalLoading(true);
    try {
      await openCustomerPortalAction();
    } catch (err) {
      console.error("Error opening customer portal:", err);
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <>
      <UpgradePlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentPlan={planName}
        stripeSubscriptionId={stripeSubscriptionId || undefined}
      />

      <div className="space-y-6">
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  Current Subscription
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Your current plan and subscription details
                </p>
              </div>
              <Badge
                variant={isPaidPlan ? "default" : "outline"}
                className="w-fit capitalize"
              >
                {loading
                  ? "Loading..."
                  : `${planDetails.name.split("-")[0].charAt(0).toUpperCase() + planDetails.name.split("-")[0].slice(1)} Plan`}
              </Badge>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium capitalize">
                  {loading ? "..." : planDetails.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flashcard Decks</span>
                <span className="font-medium">
                  {loading ? "..." : `${planDetails.limits.decks} Max`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Generation</span>
                <span className="font-medium">
                  {loading ? "..." : `${planDetails.limits.energy} Energy/Day`}
                </span>
              </div>
              {isPaidPlan && nextBillingDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Next Billing Date
                  </span>
                  <span className="font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {nextBillingDate}
                  </span>
                </div>
              )}
              {isPaidPlan && isCanceled && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-destructive">
                    Cancels at end of billing period
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {isPaidPlan && (
                <Button
                  variant="outline"
                  onClick={handleOpenCustomerPortal}
                  disabled={loading || portalLoading}
                  className="w-full sm:w-auto"
                >
                  {portalLoading ? <Loading /> : "Manage Subscription"}
                </Button>
              )}
              <Button
                className="w-full sm:w-auto"
                onClick={() => setIsDialogOpen(true)}
                disabled={loading}
              >
                {isPaidPlan && !isCanceled ? "Change Plan" : "Upgrade Plan"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
