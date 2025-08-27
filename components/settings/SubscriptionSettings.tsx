"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import { UpgradePlanDialog } from "components/study/dialogs/UpgradePlanDialog";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import { Subscription, User } from "db/types/models.types";
import { CalendarIcon } from "lucide-react";
import { openCustomerPortalAction } from "@subscription/actions/subscription.action";
import { Loading } from "components/ui/Loading";
import { getPlanDetails } from "@subscription/utils/get-plan-details";

export function SubscriptionSettings({
  user,
  subscription,
}: {
  user: User;
  subscription?: Subscription | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const planDetails = getPlanDetails(subscription as Subscription);
  const isPaidPlan = Boolean(subscription?.plan && subscription.plan !== "starter");
  const isCanceled = Boolean(subscription?.cancelAtPeriodEnd);

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

  const planLabel = `${planDetails.name.split("-")[0].charAt(0).toUpperCase() + planDetails.name.split("-")[0].slice(1)} Plan`;

  return (
    <>
      <UpgradePlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentPlan={subscription?.plan || "starter"}
        stripeSubscriptionId={subscription?.stripeSubscriptionId || undefined}
      />

      <div className="space-y-6">
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Current Subscription</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Your current plan and subscription details
                </p>
              </div>
              <Badge variant={isPaidPlan ? "default" : "outline"} className="w-fit capitalize">
                {planLabel}
              </Badge>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium capitalize">{planDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flashcard Decks</span>
                <span className="font-medium">{`${planDetails.limits.decks} Max`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Generation</span>
                <span className="font-medium">{`${planDetails.limits.energy} Energy/Day`}</span>
              </div>
              {isPaidPlan && subscription?.periodEnd && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Billing Date</span>
                  <span className="font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(subscription.periodEnd).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              {isPaidPlan && isCanceled && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-destructive">Cancels at end of billing period</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {isPaidPlan && (
                <Button
                  variant="outline"
                  onClick={handleOpenCustomerPortal}
                  disabled={portalLoading}
                  className="w-full sm:w-auto"
                >
                  {portalLoading ? <Loading /> : "Manage Subscription"}
                </Button>
              )}
              <Button className="w-full sm:w-auto" onClick={() => setIsDialogOpen(true)}>
                {isPaidPlan && !isCanceled ? "Change Plan" : "Upgrade Plan"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
