"use client";

import React, { useState } from "react";
import { Button } from "components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";
import { GithubLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";

const Hero = () => {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const router = useRouter();

  const handleGetStartedClick = () => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";

    if (isBetaMode) {
      setShowSubscriptionPopup(true);
    } else {
      router.push("/library");
    }
  };
  return (
    <>
      <SubscriptionPopup
        open={showSubscriptionPopup}
        setOpen={setShowSubscriptionPopup}
      />
      <section className="pt-24 pb-20 flex justify-center">
        <div className="container text-center">
          {/* Badge */}
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            <div className="inline-flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Launching Soon</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl font-bold lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
              AI Flashcards That Actually Make You Smarter
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-balance lg:text-lg max-w-4xl mx-auto leading-relaxed">
              Built for students who want to stop wasting time. Create
              flashcards from notes, study with smart quizzes, and track
              mastery. Join thousands of students boosting retention by 94%.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
            <Button
              size="lg"
              className="px-8 py-5 text-base w-full sm:w-auto"
              onClick={handleGetStartedClick}
            >
              <span className="flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-5 text-base w-full sm:w-auto group"
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 group-hover:bg-primary transition-colors">
                  <Play className="w-3 h-3 text-primary group-hover:text-primary-foreground transition-colors" fill="currentColor" />
                </div>
                Watch Demo
              </span>
            </Button>
          </div>

          {/* GitHub Link */}
          <div className="flex justify-center mt-6">
            <a
              href="https://github.com/kysondev/felinify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/50"
            >
              <GithubLogoIcon className="w-3 h-3" />
              <span>Star on GitHub</span>
            </a>
          </div>

          {/* Product screenshot */}
          <div className="relative mt-10 overflow-hidden px-1 sm:px-2">
            <div className="bg-gradient-to-b to-[#FEFEFE] dark:to-gray-950 absolute inset-0 z-10 from-transparent from-35%"></div>
            <div className="relative mx-auto max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-[#FEFEFE] dark:bg-gray-900 shadow-2xl shadow-zinc-950/20">
              <div className="bg-muted/30 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-border"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-border"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-border"></div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bg-background border border-border/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 w-[140px] sm:w-[280px] md:w-[420px] lg:w-[480px]">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">felinify.com</span>
                </div>
                
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-transparent flex items-center justify-center">
                    <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="w-5 h-5 rounded bg-transparent flex items-center justify-center">
                    <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="w-5 h-5 rounded bg-transparent flex items-center justify-center">
                    <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div className="w-8 sm:hidden"></div>
              </div>

              <div className="relative rounded-b-lg overflow-hidden">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756331513/Screenshot_2025-08-27_175059_tjhsxt.png"
                  />
                  <Image
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
          {/* Technology Stack */}
          <div className="bottom-10 relative z-10">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Powered by industry-leading tools
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12">
              <div className="flex items-center gap-3">
                <img
                  src="/nextjs.svg"
                  alt="NextJS"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  NextJS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/cloudflare.svg"
                  alt="Cloudflare"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  Cloudflare
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/stripe.svg"
                  alt="Stripe"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  Stripe
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/upstash.svg"
                  alt="Upstash"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  Upstash
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/cloudinary.svg"
                  alt="Cloudinary"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  Cloudinary
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/resend.svg"
                  alt="Resend"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-muted-foreground">
                  Resend
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Hero };
