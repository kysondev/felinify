import React from "react";
import { Button } from "components/ui/Button";

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
  heading = "Smart Flashcards Built for Focused, Fast Learning",
  description = "Create, review, and manage flashcards with AI-assisted tools in a minimal, distraction-free interface.",
  button = {
    text: "Get Started",
    url: "/workspace",
  },
}: HeroProps) => {
  return (
    <section className="pt-32 pb-8 flex justify-center">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-bold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-5">
          <a href={button.url}>{button.text}</a>
        </Button>
        <div className="relative mt-8 overflow-hidden px-1 sm:px-2">
          <div className="bg-gradient-to-b to-white dark:to-gray-950 absolute inset-0 z-10 from-transparent from-35%"></div>
          <div className="relative mx-auto max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl overflow-hidden rounded-lg sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 sm:p-3 shadow-md sm:shadow-lg shadow-zinc-950/15">
            <div className="relative rounded-lg overflow-hidden">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1752106405/Screenshot_2025-07-09_201143_yenjjt.png"
                />
                <img
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1752104845/Screenshot_2025-07-09_194526_ysgaty.png"
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
