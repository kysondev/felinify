import React from "react";
import { Button } from "components/ui/Button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Hero = ({
  heading = "AI Flashcards That Actually Make You Smarter",
  description = "Built for students who want to stop wasting time. Create flashcards from notes, study with smart quizzes, and track mastery",
  button = {
    text: "Get Started",
    url: "/workspace",
  },
}: HeroProps) => {
  return (
    <section className="pt-24 pb-16 flex justify-center">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="inline-block mx-auto px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
            Open Beta: August 24, 2025
          </div>
          <h1 className="text-4xl font-bold lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {heading}
          </h1>
          <p className="text-muted-foreground text-balance lg:text-xl max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-8 px-8">
          <a href={button.url} className="flex items-center gap-2">
            {button.text} <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
        <div className="relative mt-16 overflow-hidden px-1 sm:px-2">
          <div className="bg-gradient-to-b to-white dark:to-gray-950 absolute inset-0 z-10 from-transparent from-35%"></div>
          <div className="relative mx-auto max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 sm:p-3 shadow-lg shadow-zinc-950/15">
            <div className="relative rounded-lg overflow-hidden">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1753674597/Screenshot_2025-07-27_234900_ntggzz.png"
                />
                <img
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1753674459/Screenshot_2025-07-27_234620_ghc4zc.png"
                  alt="app screen"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-white/20 to-white dark:via-gray-950/20 dark:to-gray-950"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
