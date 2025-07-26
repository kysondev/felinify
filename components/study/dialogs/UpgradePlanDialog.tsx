"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/Dialog";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { RadioGroup, RadioGroupItem } from "components/ui/Radio-group";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import { createSubscriptionAction } from "actions/subscription.action";
import { plans } from "config/plans.config";

interface UpgradePlanDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  currentPlan?: string;
  stripeSubscriptionId?: string;
}

export function UpgradePlanDialog({
  open,
  onOpenChange,
  currentPlan = "starter",
  stripeSubscriptionId,
}: UpgradePlanDialogProps) {
  const [isAnnually, setIsAnnually] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "ultra">("pro");

  const isCurrentPlanYearly = currentPlan.toLowerCase().includes("yearly");
  const currentPlanBase = isCurrentPlanYearly
    ? currentPlan.toLowerCase().replace("-yearly", "")
    : currentPlan.toLowerCase();

  useEffect(() => {
    if (open && (currentPlanBase === "pro" || currentPlanBase === "ultra")) {
      setSelectedPlan(currentPlanBase as "pro" | "ultra");
      setIsAnnually(isCurrentPlanYearly);
    }
  }, [open, currentPlan, currentPlanBase, isCurrentPlanYearly]);

  const proMonthly = plans.find((plan) => plan.name === "pro")?.price || 0;
  const ultraMonthly = plans.find((plan) => plan.name === "ultra")?.price || 0;
  const proOriginalYearly = 35.99;
  const ultraOriginalYearly = 95.99;
  const proAnnualDiscount =
    plans.find((plan) => plan.name === "pro-yearly")?.price || 0;
  const ultraAnnualDiscount =
    plans.find((plan) => plan.name === "ultra-yearly")?.price || 0;

  const handleSubscribe = async () => {
    const planName = isAnnually ? `${selectedPlan}-yearly` : selectedPlan;

    await createSubscriptionAction(
      {
        name: planName,
        priceId: plans.find((plan) => plan.name === planName)?.priceId || "",
        limits: plans.find((plan) => plan.name === planName)?.limits || {},
      },
      stripeSubscriptionId || ""
    );
  };

  const isCurrentPlan =
    currentPlanBase === selectedPlan && isCurrentPlanYearly === isAnnually;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose a plan that fits your study style and unlock AI-powered
            flashcards.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end mt-4">
          <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
            <RadioGroup
              defaultValue={isCurrentPlanYearly ? "annually" : "monthly"}
              className="h-full grid-cols-2"
              onValueChange={(value) => setIsAnnually(value === "annually")}
            >
              <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                <RadioGroupItem
                  value="monthly"
                  id="monthly-dialog"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="monthly-dialog"
                  className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
                >
                  Monthly
                </Label>
              </div>
              <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                <RadioGroupItem
                  value="annually"
                  id="annually-dialog"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="annually-dialog"
                  className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
                >
                  Yearly
                  <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-xs text-background">
                    Save 30%
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div
            className={`flex w-full flex-col rounded-lg border p-6 text-left cursor-pointer transition-all ${
              selectedPlan === "pro" ? "ring-2 ring-primary" : ""
            } ${currentPlanBase === "pro" ? "bg-primary/10" : ""}`}
            onClick={() => setSelectedPlan("pro")}
          >
            <div className="flex justify-between items-center mb-8">
              <Badge className="w-fit">Pro</Badge>
              {currentPlanBase === "pro" && (
                <Badge variant="secondary">
                  {isCurrentPlanYearly === isAnnually
                    ? "Current Plan"
                    : isAnnually
                      ? "Upgrade to Yearly"
                      : "Switch to Monthly"}
                </Badge>
              )}
            </div>
            {isAnnually ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-medium">
                    ${proAnnualDiscount}
                  </span>
                  <span className="text-muted-foreground line-through text-lg">
                    ${proOriginalYearly}
                  </span>
                </div>
                <p className="text-muted-foreground">Per year</p>
              </>
            ) : (
              <>
                <span className="text-4xl font-medium">${proMonthly}</span>
                <p className="text-muted-foreground">Per month</p>
              </>
            )}
            <Separator className="my-6" />
            <div className="flex h-full flex-col justify-between gap-4">
              <ul className="text-muted-foreground space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Everything in starter plan, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Max 30 flashcard decks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>50 Lumix credits per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>
                    Advanced AI generation with more powerful AI models
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`flex w-full flex-col rounded-lg border p-6 text-left cursor-pointer transition-all ${
              selectedPlan === "ultra" ? "ring-2 ring-primary" : ""
            } ${currentPlanBase === "ultra" ? "bg-primary/10" : ""}`}
            onClick={() => setSelectedPlan("ultra")}
          >
            <div className="flex justify-between items-center mb-8">
              <Badge className="w-fit">Ultra</Badge>
              {currentPlanBase === "ultra" && (
                <Badge variant="secondary">
                  {isCurrentPlanYearly === isAnnually
                    ? "Current Plan"
                    : isAnnually
                      ? "Upgrade to Yearly"
                      : "Switch to Monthly"}
                </Badge>
              )}
            </div>
            {isAnnually ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-medium">
                    ${ultraAnnualDiscount}
                  </span>
                  <span className="text-muted-foreground line-through text-lg">
                    ${ultraOriginalYearly}
                  </span>
                </div>
                <p className="text-muted-foreground">Per year</p>
              </>
            ) : (
              <>
                <span className="text-4xl font-medium">${ultraMonthly}</span>
                <p className="text-muted-foreground">Per month</p>
              </>
            )}
            <Separator className="my-6" />
            <div className="flex h-full flex-col justify-between gap-4">
              <ul className="text-muted-foreground space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Everything in Pro, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>100 Lumix credits per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Max 80 flashcard decks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Priority AI assistance & explanations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubscribe} disabled={isCurrentPlan}>
            {isCurrentPlan
              ? "Current Plan"
              : currentPlanBase === selectedPlan &&
                  isCurrentPlanYearly !== isAnnually
                ? isAnnually
                  ? "Upgrade to Yearly Plan"
                  : "Switch to Monthly Plan"
                : `Subscribe to ${
                    selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)
                  } ${isAnnually ? "Yearly" : "Monthly"} Plan`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
