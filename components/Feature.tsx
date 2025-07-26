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
      icon: <Zap className="size-5 md:size-6 text-primary" />,
    },
    {
      title: "Minimal, Distraction-Free UI",
      description:
        "Study in a clean interface that keeps you focused on what matters — the content, not the clutter.",
      icon: <ZoomIn className="size-5 md:size-6 text-primary" />,
    },
    {
      title: "Three Study Modes, One Goal",
      description:
        "Review, Quiz, and Practice modes let you study your way — fast, focused, and flexible",
      icon: <Timer className="size-5 md:size-6 text-primary" />,
    },
    {
      title: "Organized by Default",
      description:
        "Create decks, tag content, and manage subjects easily without losing track of what you're learning.",
      icon: <PersonStanding className="size-5 md:size-6 text-primary" />,
    },
    {
      title: "Fair & Transparent Pricing",
      description:
        "Pay once or subscribe — no hidden fees or upsells. Built to be affordable for students and educators alike.",
      icon: <DollarSign className="size-5 md:size-6 text-primary" />,
    },
    {
      title: "AI-Powered Help When You Need It",
      description:
        "Struggling to understand a concept? Ask for a hint, definition, or breakdown — all within your flashcards.",
      icon: <MessagesSquare className="size-5 md:size-6 text-primary" />,
    },
  ],
}: FeatureProps) => {
  return (
    <section className="py-24" id="features">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 text-sm font-medium text-primary">{subheading}</p>
          <h2 className="text-3xl font-semibold lg:text-4xl">{heading}</h2>
        </div>
        <div className="mx-auto grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              className="flex gap-6 rounded-lg p-4 transition-all hover:bg-muted/50"
              key={idx}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium mb-2 text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
