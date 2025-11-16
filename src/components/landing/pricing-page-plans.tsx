"use client";

import { useState } from "react";
import { Check, Rocket, Star, Crown } from "lucide-react";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Separator } from "@ui/separator";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

export const PricingPagePlans = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const router = useRouter();

  const handleWorkspaceClick = () => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";

    if (isBetaMode) {
      setShowSubscriptionPopup(true);
    } else {
      router.push("/library");
    }
  };

  const proOriginalYearly = 35.99;
  const ultraOriginalYearly = 95.99;
  const proMonthly = 2.99;
  const ultraMonthly = 7.99;
  const proAnnualDiscount = 25.19;
  const ultraAnnualDiscount = 67.19;

  return (
    <>
      <SubscriptionPopup
        open={showSubscriptionPopup}
        setOpen={setShowSubscriptionPopup}
      />
      <section className="pt-4" aria-labelledby="pricing-page-plans-heading">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-muted/70 flex h-11 w-fit shrink-0 items-center rounded-full p-1 text-sm shadow-sm border border-border">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid grid-cols-2 gap-1"
                onValueChange={(value) => setIsAnnually(value === "annually")}
              >
                <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-full transition-all duration-200'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly-pricing-page"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly-pricing-page"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-5 font-medium transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-full transition-all duration-200'>
                  <RadioGroupItem
                    value="annually"
                    id="annually-pricing-page"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually-pricing-page"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-5 font-medium transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Yearly
                    <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] sm:text-[11px] text-primary-foreground font-medium whitespace-nowrap">
                      Save 30%
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Switch or cancel any time. Prices in USD.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">
            <div className="rounded-2xl border-2 border-primary bg-card p-6 md:p-7 shadow-sm space-y-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Pro
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Best for serious weekly study and multiple classes.
                    </p>
                  </div>
                </div>
                <Badge className="text-[11px]">Most popular</Badge>
              </div>

              <div>
                {isAnnually ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${proAnnualDiscount}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${proOriginalYearly}
                    </span>
                    <span className="text-xs text-emerald-500 font-medium">
                      save 30%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${proMonthly}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      per month
                    </span>
                  </div>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {isAnnually ? "Billed yearly" : "Billed monthly"}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 md:grid-cols-2">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Up to 30 flashcard decks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>50 Energy per day</span>
                  </li>
                </ul>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Extended Felinify AI access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Perfect for midterm + exam seasons</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Priority access to new features</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                <Button className="w-full" onClick={handleWorkspaceClick}>
                  Choose Pro plan
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Not sure yet? You can start on Starter and upgrade in a few
                  clicks later.
                </p>
              </div>
            </div>

            <div className="space-y-4 h-full flex flex-col">
              <div className="rounded-2xl border border-border/70 bg-card/80 p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Starter
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Ideal if you&apos;re just trying Felinify.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    $0
                  </span>
                </div>
                <Separator className="my-3" />
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Up to 15 flashcard decks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>10 Energy per day</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Core AI flashcard generation</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card/80 p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Ultra
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        For heavy users and power learners.
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {isAnnually ? (
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-sm font-semibold text-foreground">
                          ${ultraAnnualDiscount}
                        </span>
                        <span className="text-[11px] text-muted-foreground line-through">
                          ${ultraOriginalYearly}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-foreground">
                        ${ultraMonthly}/mo
                      </span>
                    )}
                  </div>
                </div>
                <Separator className="my-3" />
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Up to 80 flashcard decks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>100 Energy per day</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Full Felinify AI access</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full text-xs sm:text-sm"
                  onClick={handleWorkspaceClick}
                >
                  Choose Ultra plan
                </Button>
              </div>

              <div className="text-[11px] text-muted-foreground text-center">
                Not sure which plan to choose? Start on Starter and upgrade once
                you see how you study with Felinify.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
