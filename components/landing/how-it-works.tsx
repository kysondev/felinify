"use client";

import { Lightbulb, LineChart } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../ui/button";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

const StepCard = memo(
  ({ step, index, isLast }: { step: any; index: number; isLast: boolean }) => (
    <div className="relative group">
      <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-primary/10 p-4 rounded-xl relative group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {step.icon}
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm">
                {index + 1}
              </div>
            </div>
            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full font-medium">
              {step.time}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {step.description}
          </p>

          <ul className="space-y-3">
            {step.details.map((detail: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-200">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                </div>
                <span className="text-muted-foreground leading-relaxed">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-0.5 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
            <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          </div>
        </div>
      )}
    </div>
  )
);

StepCard.displayName = "StepCard";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Create AI Flashcards",
      description:
        "Upload your notes, PDFs, or paste text directly. Our AI analyzes your content and instantly creates effective flashcards that focus on key concepts and relationships.",
      icon: (
        <CardsIcon
          size={32}
          className="text-primary group-hover:text-primary-foreground"
        />
      ),
      details: [
        "Supports any file type or direct text input",
        "AI identifies the most important concepts",
        "Creates both simple and complex question types",
        "Works with any subject from STEM to humanities",
      ],
      time: "30 seconds",
    },
    {
      title: "Study Smarter",
      description:
        "Choose your preferred study mode: Review for quick refreshers, Quiz for active recall, or Practice for spaced repetition. Our system adapts to your learning pace.",
      icon: (
        <Lightbulb className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
      ),
      details: [
        "Review mode for casual browsing of cards",
        "Quiz mode tests your recall with immediate feedback",
        "Practice mode uses spaced repetition algorithms",
        "Difficulty adjusts based on your performance",
      ],
      time: "15-30 minutes",
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your mastery with detailed analytics. See which topics need more attention, track your improvement over time, and celebrate your learning milestones.",
      icon: (
        <LineChart className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
      ),
      details: [
        "Visual progress tracking for each deck",
        "Identify weak spots that need more practice",
        "See your retention rates over time",
        "Get personalized study recommendations",
      ],
      time: "Ongoing",
    },
  ];
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

  return (
    <>
      <SubscriptionPopup 
        open={showSubscriptionPopup} 
        setOpen={setShowSubscriptionPopup} 
      />
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="how-it-works-heading"
      >
      <div className="px-4 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold sm:text-3xl lg:text-4xl text-foreground mb-4"
          >
            How Felinify Works
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
            Transform your study routine in three simple steps — from notes to mastery in minutes
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={`step-${index}`}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-12 sm:mt-16 p-8 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
            See how easy it is? Most students create their first deck in under a
            minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleWorkspaceClick}>
              Try It Now — Free
            </Button>
            <Button variant="outline">Watch Demo</Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
