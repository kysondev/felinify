"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { RadioGroup, RadioGroupItem } from "components/ui/Radio-group";
import { Separator } from "components/ui/Separator";
import Link from "next/link";

const Pricing = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const proOriginalYearly = 60;
  const eliteOriginalYearly = 90;

  return (
    <section className="py-4 mt-12" id="pricing">
      <div className="">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <h2 className="text-pretty text-4xl font-semibold lg:text-4xl">
            Pricing
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="text-muted-foreground max-w-3xl lg:text-xl">
              Choose a plan that fits your study style and unlock AI-powered
              flashcards designed to help you learn smarter and faster.
            </p>
            <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={(value) => setIsAnnually(value === "annually")}
              >
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
                  >
                    Yearly
                    <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-xs text-background">
                      Save 20%
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            {/* Starter Plan */}
            <div className="flex w-full flex-col rounded-lg border p-6 text-left">
              <Badge className="mb-8 block w-fit">Starter</Badge>
              <span className="text-4xl font-medium">$0</span>
              <p className="text-muted-foreground">Forever free</p>
              <Separator className="my-6" />
              <div className="flex flex-col justify-between gap-20 h-full">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Up to 15 flashcard Decks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Limited AI flashcard generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Minimalist study mode</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto" asChild>
                  <Link href="/workspace">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex w-full flex-col rounded-lg border p-6 text-left">
              <Badge className="mb-8 block w-fit">Pro</Badge>
              {isAnnually ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-medium">$48</span>
                    <span className="text-muted-foreground line-through text-lg">
                      ${proOriginalYearly}
                    </span>
                  </div>
                  <p className="text-muted-foreground">Per year</p>
                </>
              ) : (
                <>
                  <span className="text-4xl font-medium">$5</span>
                  <p className="text-muted-foreground">Per month</p>
                </>
              )}
              <Separator className="my-6" />
              <div className="flex h-full flex-col justify-between gap-20">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Everything in free plan, plus:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Unlimited flashcards & decks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>
                      Advanced AI generation with more powerful AI models
                    </span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/workspace">Purchase</Link>
                </Button>
              </div>
            </div>

            {/* Elite Plan */}
            <div className="bg-muted flex w-full flex-col rounded-lg border p-6 text-left">
              <Badge className="mb-8 block w-fit">Elite</Badge>
              {isAnnually ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-medium">$72</span>
                    <span className="text-muted-foreground line-through text-lg">
                      ${eliteOriginalYearly}
                    </span>
                  </div>
                  <p className="text-muted-foreground">Per year</p>
                </>
              ) : (
                <>
                  <span className="text-4xl font-medium">$10</span>
                  <p className="text-muted-foreground">Per month</p>
                </>
              )}
              <Separator className="my-6" />
              <div className="flex h-full flex-col justify-between gap-20">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Priority AI assistance & explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Advanced analytics on your learning progress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Early access to new AI features</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/workspace">Purchase</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing };
