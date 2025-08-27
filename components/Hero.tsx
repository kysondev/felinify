import React from "react";
import { Button } from "components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const Hero = ({
  heading = "AI Flashcards That Actually Make You Smarter",
  description = "Built for students who want to stop wasting time. Create flashcards from notes, study with smart quizzes, and track mastery. Join thousands of students boosting retention by 94%.",
  button = {
    text: "Get Started",
    url: "/workspace",
  },
}: HeroProps) => {
  return (
    <section className="pt-24 pb-20 flex justify-center">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="inline-flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Launching September 2025</span>
          </div>
          <h1 className="text-4xl font-bold lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
            {heading}
          </h1>
          <p className="text-muted-foreground text-balance lg:text-lg max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
          <Button
            asChild
            size="lg"
            className="px-8 py-5 text-base w-full sm:w-auto"
          >
            <a href={button.url} className="flex items-center gap-2">
              {button.text} <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-5 text-base w-full sm:w-auto"
          >
            Watch Demo
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1 sm:gap-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-semibold text-foreground whitespace-nowrap">
              Launching Soon
            </span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center gap-1 sm:gap-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="font-semibold text-foreground whitespace-nowrap">
              AI-Powered
            </span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center gap-1 sm:gap-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span className="font-semibold text-foreground whitespace-nowrap">
              Join Beta
            </span>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden px-1 sm:px-2">
          <div className="bg-gradient-to-b to-[#FEFEFE] dark:to-gray-950 absolute inset-0 z-10 from-transparent from-35%"></div>
          <div className="relative mx-auto max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-[#FEFEFE] dark:bg-gray-900 p-1 sm:p-3 shadow-lg shadow-zinc-950/15">
            <div className="relative rounded-lg overflow-hidden">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756331513/Screenshot_2025-08-27_175059_tjhsxt.png"
                />
                <img
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756331516/Screenshot_2025-08-27_175047_apmekq.png"
                  alt="Felinify AI flashcard application interface showing study dashboard"
                  loading="eager"
                  width="1200"
                  height="675"
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
