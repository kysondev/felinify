"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "components/ui/button";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

const Cta = () => {
  const items = [
    "AI-Powered Flashcard Generation",
    "Multiple study modes",
    "Minimalist Focus Mode",
    "Sync Across All Devices",
    "Highly customizable",
  ];
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
              <div className="group relative bg-card border border-border rounded-xl p-12 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-start justify-between gap-10 md:flex-row">
                {/* Left content */}
                <div className="md:w-1/2">
                  <h3 className="mb-4 text-3xl font-semibold md:text-4xl text-primary">
                    Boost Your Learning Efficiency
                  </h3>
                  <p className="text-muted-foreground text-lg">Master any subject with AI-enhanced flashcards, smart repetition, and a distraction-free study experience built for serious learners.</p>
                  <Button
                    className="mt-8 px-8"
                    size="lg"
                    onClick={handleWorkspaceClick}
                  >
                    <span className="flex items-center gap-2">
                      Start Learning Free <ArrowRight className="size-4" />
                    </span>
                  </Button>
                </div>
                
                {/* Right content - feature list */}
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
                
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Cta };
