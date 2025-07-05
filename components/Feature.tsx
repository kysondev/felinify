import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

const Feature = ({
  heading = "Designed for Better Learning",
  subheading = "Core Features",
  features = [
    {
      title: "Instant Flashcard Generation",
      description:
        "Paste your notes and let AI instantly create clear, effective flashcards — no formatting or setup required.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      title: "Minimal, Distraction-Free UI",
      description:
        "Study in a clean interface that keeps you focused on what matters — the content, not the clutter.",
      icon: <ZoomIn className="size-4 md:size-6" />,
    },
    {
      title: "Smart Review Mode",
      description:
        "Prioritize what you don’t know and reinforce what you do — powered by spaced repetition logic.",
      icon: <Timer className="size-4 md:size-6" />,
    },
    {
      title: "Organized by Default",
      description:
        "Create decks, tag content, and manage subjects easily without losing track of what you’re learning.",
      icon: <PersonStanding className="size-4 md:size-6" />,
    },
    {
      title: "Fair & Transparent Pricing",
      description:
        "Pay once or subscribe — no hidden fees or upsells. Built to be affordable for students and educators alike.",
      icon: <DollarSign className="size-4 md:size-6" />,
    },
    {
      title: "AI-Powered Help When You Need It",
      description:
        "Struggling to understand a concept? Ask for a hint, definition, or breakdown — all within your flashcards.",
      icon: <MessagesSquare className="size-4 md:size-6" />,
    },
  ],
}: FeatureProps) => {
  return (
    <section className="py-4">
      <div className="container mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {subheading}
        </p>
        <h2 className="text-3xl font-semibold lg:text-4xl">{heading}</h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-18">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
