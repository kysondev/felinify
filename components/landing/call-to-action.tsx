"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "components/ui/button";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

interface CtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "AI-Powered Flashcard Generation",
  "Multiple study modes",
  "Minimalist Focus Mode",
  "Sync Across All Devices",
  "Highly customizable",
];

const Cta = ({
  title = "Boost Your Learning Efficiency",
  description = "Master any subject with AI-enhanced flashcards, smart repetition, and a distraction-free study experience built for serious learners.",
  buttonText = "Start Learning Free",
  items = defaultItems,
}: CtaProps) => {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const router = useRouter();

  const handleWorkspaceClick = () => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";

    if (isBetaMode) {
      setShowSubscriptionPopup(true);
    } else {
      router.push("/workspace");
    }
  };

  return (
    <>
      <SubscriptionPopup
        open={showSubscriptionPopup}
        setOpen={setShowSubscriptionPopup}
      />
      <section className="py-16">
        <div className="px-4 max-w-[1200px] mx-auto">
          <div className="flex justify-center">
            <div className="w-full">
              <div className="flex flex-col items-start justify-between gap-10 rounded-2xl bg-primary/5 border border-primary/20 px-8 py-12 md:flex-row lg:px-16 lg:py-20">
                <div className="md:w-1/2">
                  <h3 className="mb-4 text-3xl font-semibold md:text-4xl text-primary">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-lg">{description}</p>
                  <Button
                    className="mt-8 px-8"
                    size="lg"
                    onClick={handleWorkspaceClick}
                  >
                    <span className="flex items-center gap-2">
                      {buttonText} <ArrowRight className="size-4" />
                    </span>
                  </Button>
                </div>
                <div className="md:w-1/3">
                  <ul className="flex flex-col space-y-4 text-md font-medium">
                    {items.map((item, idx) => (
                      <li className="flex items-center" key={idx}>
                        <div className="bg-primary/10 p-1 rounded-full mr-3">
                          <Check className="text-primary size-4 flex-shrink-0" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Cta };
