"use client";

import { Check, Crown, Star, Rocket } from "lucide-react";
import { useState } from "react";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Separator } from "@ui/separator";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

interface PricingProps {
  showHeader?: boolean;
}

const Pricing = ({ showHeader = true }: PricingProps) => {
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
      <section
        className="py-16 sm:py-20 lg:py-24"
        id="pricing"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {showHeader && (
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="pricing-heading"
                className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-foreground"
              >
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                Choose a plan that fits your study style and unlock AI-powered
                flashcards designed to help you learn smarter and faster.
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="bg-muted/70 flex h-11 w-fit shrink-0 items-center rounded-full p-1 text-sm shadow-sm border border-border">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid grid-cols-2 gap-1"
                onValueChange={(value) => setIsAnnually(value === "annually")}
              >
                <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-full transition-all duration-200'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-5 font-medium transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-full transition-all duration-200'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
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
              Prices in USD. Cancel any time.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            <div className="group relative rounded-2xl border border-border/70 bg-card/80 p-6 md:p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Starter
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        For trying Felinify and light study.
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[11px]">
                    Free
                  </Badge>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      $0
                    </span>
                    <span className="text-xs text-muted-foreground">
                      forever
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <ul className="text-muted-foreground space-y-2.5 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Up to 15 flashcard decks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>10 Energy per day</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Core AI flashcard generation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Limited Felinify AI access</span>
                  </li>
                </ul>
              </div>

              <Button
                className="mt-6 w-full"
                variant="outline"
                onClick={handleWorkspaceClick}
              >
                Get started free
              </Button>
            </div>

            <div className="group relative rounded-2xl border-2 border-primary bg-card p-6 md:p-7 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Pro
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        For focused weekly study.
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

                <ul className="text-muted-foreground space-y-2.5 text-sm">
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
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Extended Felinify AI access</span>
                  </li>
                </ul>
              </div>

              <Button className="mt-6 w-full" onClick={handleWorkspaceClick}>
                Choose Pro plan
              </Button>
            </div>

            <div className="group relative rounded-2xl border border-border/70 bg-card/80 p-6 md:p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Ultra
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        For heavy users and power learners.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  {isAnnually ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        ${ultraAnnualDiscount}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ${ultraOriginalYearly}
                      </span>
                      <span className="text-xs text-emerald-500 font-medium">
                        save 30%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        ${ultraMonthly}
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

                <ul className="text-muted-foreground space-y-2.5 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Up to 80 flashcard decks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>100 Energy per day</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Full Felinify AI access</span>
                  </li>
                </ul>
              </div>

              <Button
                className="mt-6 w-full"
                variant="outline"
                onClick={handleWorkspaceClick}
              >
                Choose Ultra plan
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Pricing };
