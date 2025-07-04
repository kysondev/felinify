import { ArrowRight, Check } from "lucide-react";
import { Button } from "components/ui/button";

interface CtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "AI-Powered Flashcard Generation",
  "Smart Spaced Repetition",
  "Minimalist Focus Mode",
  "Sync Across All Devices",
  "Early Access to New Features",
];

const Cta = ({
  title = "Boost Your Learning Efficiency",
  description = "Master any subject with AI-enhanced flashcards, smart repetition, and a distraction-free study experience built for serious learners.",
  buttonText = "Start Learning Free",
  buttonUrl = "/workspace/library",
  items = defaultItems,
}: CtaProps) => {
  return (
    <section className="mt-10">
      <div className="">
        <div className="flex justify-center">
          <div>
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-semibold md:text-3xl">
                  {title}
                </h4>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl}>
                    {buttonText} <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-4 size-4 flex-shrink-0" />
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
  );
};

export { Cta };
