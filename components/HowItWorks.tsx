import { ArrowRight, BookOpen, Lightbulb, LineChart } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

export function HowItWorks({
  title = "How Clami Works",
  subtitle = "Our simple 3-step process to supercharge your learning",
  steps = [
    {
      title: "Create AI Flashcards",
      description:
        "Paste your notes, upload documents, or create flashcards from scratch. Our AI instantly transforms your content into effective study materials.",
      icon: <BookOpen className="w-8 h-8 text-primary" />,
    },
    {
      title: "Study Smarter",
      description:
        "Use our distraction-free study modes: flip cards, quiz yourself, or challenge mode. Clami adapts to your learning style and knowledge gaps.",
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your improvement with detailed analytics. See which concepts need more attention and watch your mastery grow over time.",
      icon: <LineChart className="w-8 h-8 text-primary" />,
    },
  ],
}: HowItWorksProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold lg:text-4xl mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-background p-8 rounded-xl shadow-sm border border-border"
            >
              <div className="bg-primary/10 p-5 rounded-full mb-6 ring-4 ring-primary/5 relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-4 text-primary">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
