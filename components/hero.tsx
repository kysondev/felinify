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
    url: "/workspace/library",
  },
}: HeroProps) => {
  return (
    <section className="py-32 flex justify-center">
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
      </div>
    </section>
  );
};

export { Hero };
