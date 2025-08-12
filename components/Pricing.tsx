"use client";

import { Check, Zap, Crown, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { RadioGroup, RadioGroupItem } from "components/ui/Radio-group";
import { Separator } from "components/ui/Separator";
import Link from "next/link";

const Pricing = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const proOriginalYearly = 35.99;
  const ultraOriginalYearly = 95.99;
  const proMonthly = 2.99;
  const ultraMonthly = 7.99;
  const proAnnualDiscount = 25.19;
  const ultraAnnualDiscount = 67.19;

  return (
    <section className="py-16 sm:py-20 lg:py-24" id="pricing" aria-labelledby="pricing-heading">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="pricing-heading"
            className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-primary"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Choose a plan that fits your study style and unlock AI-powered flashcards designed to help you learn smarter and faster.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-muted flex h-12 w-fit shrink-0 items-center rounded-lg p-1 text-base shadow-sm border border-border">
            <RadioGroup
              defaultValue="monthly"
              className="h-full grid-cols-2"
              onValueChange={(value) => setIsAnnually(value === "annually")}
            >
              <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-md transition-all duration-200'>
                <RadioGroupItem
                  value="monthly"
                  id="monthly"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="monthly"
                  className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-8 font-semibold transition-colors duration-200"
                >
                  Monthly
                </Label>
              </div>
              <div className='has-[button[data-state="checked"]]:bg-background has-[button[data-state="checked"]]:shadow-sm h-full rounded-md transition-all duration-200'>
                <RadioGroupItem
                  value="annually"
                  id="annually"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="annually"
                  className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-6 sm:px-8 font-semibold transition-colors duration-200"
                >
                  Yearly
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] sm:text-xs text-primary-foreground font-bold whitespace-nowrap">
                    Save 30%
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Star className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <Badge variant="secondary" className="mb-4">Starter</Badge>
              <div className="mb-2">
                <span className="text-4xl font-bold text-foreground">$0</span>
              </div>
              <p className="text-muted-foreground text-sm">Forever free</p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Max 15 flashcard decks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>10 Energy per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Limited AI flashcard generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Limited Clami AI use</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline" asChild>
                <Link href="/workspace">Get Started Free</Link>
              </Button>
            </div>
          </div>

          <div className="group relative bg-card border-2 border-primary/20 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
                Most Popular
              </Badge>
            </div>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Zap className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <Badge variant="default" className="mb-4">Pro</Badge>
              <div className="mb-2">
                {isAnnually ? (
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      ${proAnnualDiscount}
                    </span>
                    <span className="text-muted-foreground line-through text-lg">
                      ${proOriginalYearly}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-foreground">${proMonthly}</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {isAnnually ? "Per year" : "Per month"}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Everything in starter plan, plus:</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Max 30 flashcard decks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>50 Energy per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Extended Access to Clami AI</span>
                </li>
              </ul>
              
              <Button className="w-full" asChild>
                <Link href="/workspace">Get Pro Plan</Link>
              </Button>
            </div>
          </div>

          <div className="group relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Crown className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <Badge variant="secondary" className="mb-4">Ultra</Badge>
              <div className="mb-2">
                {isAnnually ? (
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      ${ultraAnnualDiscount}
                    </span>
                    <span className="text-muted-foreground line-through text-lg">
                      ${ultraOriginalYearly}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-foreground">${ultraMonthly}</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {isAnnually ? "Per year" : "Per month"}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Everything in Pro, plus:</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Max 80 flashcard decks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>100 Energy per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Full Access to Clami AI</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline" asChild>
                <Link href="/workspace">Get Ultra Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing };
