"use client";

import { Users, Brain, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

export function Stats() {
  const stats = [
    {
      title: "AI-Powered Learning",
      description:
        "Smart algorithms adapt to your learning style and optimize study sessions",
      icon: <Brain className="w-6 h-6" />,
      highlight: "Personalized",
    },
    {
      title: "Instant Flashcard Generation",
      description:
        "Transform any content into interactive flashcards in seconds",
      icon: <Zap className="w-6 h-6" />,
      highlight: "Lightning Fast",
    },
    {
      title: "Progress Tracking",
      description:
        "Visual insights into your learning journey and knowledge retention",
      icon: <TrendingUp className="w-6 h-6" />,
      highlight: "Data-Driven",
    },
    {
      title: "Study Anywhere",
      description:
        "Seamless experience across all devices with offline support",
      icon: <Target className="w-6 h-6" />,
      highlight: "Flexible",
    },
  ];
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const router = useRouter();

  const handleWorkspaceClick = () => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";
    
    if (isBetaMode) {
      setShowSubscriptionPopup(true);
    } else {
      router.push("/workspace");
    }
  };

  return (
    <>
      <SubscriptionPopup 
        open={showSubscriptionPopup} 
        setOpen={setShowSubscriptionPopup} 
      />
      <section className="pb-20">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold lg:text-4xl mb-6 text-primary">
            Why Students Choose Felinify
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our intelligent study platform designed for modern learners
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-card border cursor-default border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {stat.highlight && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    {stat.highlight}
                  </div>
                )}

                <div className="bg-primary/10 p-4 rounded-xl mb-6 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {stat.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-16 p-8 bg-card border border-border rounded-xl">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">
              Join our community
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">
            Ready to transform your study experience?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm">
            Start your learning journey today with AI-powered flashcards
          </p>
          <Button variant="default" onClick={handleWorkspaceClick}>
            Get Started Free
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
    </>
  );
}
