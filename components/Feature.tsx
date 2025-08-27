import {
  Timer,
  Zap,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { memo } from "react";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
}

interface FeatureProps {
  heading?: string;
  subtitle?: string;
  features?: Feature[];
}

const FeatureItem = memo(({ feature, index }: { feature: Feature; index: number }) => (
  <div
    className="group relative bg-card border cursor-default border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    role="article"
    aria-labelledby={`feature-title-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10">
      {feature.highlight && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          {feature.highlight}
        </div>
      )}
      
      <div className="bg-primary/10 p-4 rounded-xl mb-6 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {feature.icon}
      </div>
      
      <h3 
        id={`feature-title-${index}`}
        className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
      >
        {feature.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
    
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500" />
  </div>
));

FeatureItem.displayName = "FeatureItem";

const Feature = ({
  heading = "Powerful Study Features",
  subtitle = "Experience the complete set of tools designed to make your learning journey effective and engaging",
  features = [
    {
      title: "Three Study Modes",
      description:
        "Choose from Classic Flip for quick review, Challenge Mode for testing knowledge, or AI Adaptive Quiz that learns from your performance.",
      icon: <Timer className="w-6 h-6" />,
      highlight: "Versatile",
    },
    {
      title: "AI Flashcard Generation",
      description:
        "Transform your notes into perfectly formatted flashcards in seconds using advanced AI technology - no manual formatting needed.",
      icon: <Zap className="w-6 h-6" />,
      highlight: "AI-Powered",
    },
    {
      title: "Smart Progress Tracking",
      description:
        "Monitor your study sessions, track mastery levels, and see detailed insights into your learning progress over time.",
      icon: <TrendingUp className="w-6 h-6" />,
      highlight: "Data-Driven",
    },
    {
      title: "Personal Library Management",
      description:
        "Organize your study materials with custom decks, tags, and categories. Edit, delete, and manage your flashcards effortlessly.",
      icon: <CardsIcon size={24} />,
      highlight: "Organized",
    },
    {
      title: "Flexible Study Sessions",
      description:
        "Customize your study experience with timed sessions, multiple rounds, and adaptive difficulty that matches your learning pace.",
      icon: <Target className="w-6 h-6" />,
      highlight: "Adaptive",
    },
    {
      title: "Premium Study Experience",
      description:
        "Unlock advanced features, unlimited decks, and priority support with our flexible subscription plans designed for students.",
      icon: <Award className="w-6 h-6" />,
      highlight: "Premium",
    },
  ],
}: FeatureProps) => {
  return (
    <section 
      className="pb-20" 
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="features-heading"
            className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-primary"
          >
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem 
              key={`feature-${index}`}
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
