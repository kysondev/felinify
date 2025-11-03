"use client";

import {
  Clock,
  BookOpen,
  Brain,
  Target,
  Zap,
  TrendingUp,
  Play,
} from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

export function FeatureShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-foreground"
              variants={itemVariants}
            >
              Study smarter, not harder — no delays, just results.
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Transform your learning with AI-powered flashcards that adapt to
              your pace, track your progress, and help you master any subject
              faster than ever before.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              <motion.div
                className="group relative bg-card border cursor-default border-border rounded-xl p-6 overflow-hidden hover:shadow-lg transition-shadow duration-200 min-h-[240px] flex flex-col"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <CardsIcon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    AI Flashcard Generation
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    Turn notes into flashcards instantly. See a preview of
                    fronts and backs as they’re generated.
                  </p>

                  <div className="relative h-40 sm:h-44 mt-2">
                    <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                    <div className="absolute -top-2 -right-2 w-36 sm:w-40 h-24 sm:h-28 rotate-3 shadow-sm border border-border rounded-md bg-white dark:bg-card p-3">
                      <div className="h-2 w-3/4 bg-primary/20 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-muted rounded mb-1.5"></div>
                      <div className="h-2 w-5/6 bg-muted/60 rounded"></div>
                    </div>
                    <div className="absolute top-4 left-2 w-40 sm:w-44 h-28 sm:h-32 -rotate-2 shadow-sm border border-border rounded-md bg-white dark:bg-card p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-primary">
                          <CardsIcon size={12} />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          Front
                        </span>
                      </div>
                      <div className="h-2 w-5/6 bg-muted rounded mb-1"></div>
                      <div className="h-2 w-2/3 bg-muted rounded"></div>
                    </div>
                    <div className="absolute bottom-0 left-10 w-44 sm:w-48 h-28 sm:h-32 rotate-1 shadow-sm border border-border rounded-md bg-white dark:bg-card p-3">
                      <div className="text-[10px] text-muted-foreground mb-1">
                        Back
                      </div>
                      <div className="h-2 w-3/4 bg-muted rounded mb-1"></div>
                      <div className="h-2 w-1/2 bg-muted rounded mb-1"></div>
                      <div className="h-2 w-2/3 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </motion.div>

              <motion.div
                className="group relative bg-card border cursor-default border-border rounded-xl p-6 overflow-hidden hover:shadow-lg transition-shadow duration-200 min-h-[240px] flex flex-col"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Smart Progress Tracking
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    Quickly scan your momentum with a weekly spark chart and a
                    clear goal snapshot.
                  </p>

                  <div className="bg-white rounded-lg shadow-sm border border-border p-4 flex flex-col">
                    <div className="grid grid-cols-5 gap-4 items-start mb-3">
                      <div className="col-span-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground">
                            Study Progress
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-primary">
                              87%
                            </span>
                            <span className="text-xs text-green-600">+15%</span>
                          </div>
                        </div>
                        <Progress value={87} className="w-full h-2 mb-2" />
                        <p className="text-xs text-muted-foreground">
                          Great progress on Biology deck!
                        </p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-end justify-between h-24">
                          <div className="w-2.5 rounded bg-muted h-6"></div>
                          <div className="w-2.5 rounded bg-primary/40 h-10"></div>
                          <div className="w-2.5 rounded bg-primary/60 h-14"></div>
                          <div className="w-2.5 rounded bg-primary h-20"></div>
                          <div className="w-2.5 rounded bg-primary/70 h-16"></div>
                        </div>
                        <div className="mt-2 text-[10px] text-muted-foreground text-right">
                          Last 7 days
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 w-full bg-primary text-primary-foreground"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Continue Study
                    </Button>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </motion.div>

              <motion.div
                className="group relative bg-card border cursor-default border-border rounded-xl overflow-hidden p-6 hover:shadow-lg transition-shadow duration-200"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Brain className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Multiple Study Modes
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    Choose Review, Quiz, or Challenge. Preview settings and get
                    going faster.
                  </p>

                  <div className="bg-white rounded-lg shadow-sm border border-border p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Flip
                      </span>
                      <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs flex items-center gap-1">
                        <Target className="w-3 h-3" /> Challenge
                      </span>
                      <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Adaptive
                      </span>
                    </div>

                    <div className="relative h-40">
                      <div className="absolute left-0 top-1 w-40 h-28 -rotate-2 border border-border rounded-md bg-white dark:bg-card p-3 shadow-sm">
                        <div className="text-[10px] text-muted-foreground mb-1">
                          Front
                        </div>
                        <div className="h-2 w-5/6 bg-muted rounded mb-1"></div>
                        <div className="h-2 w-2/3 bg-muted rounded"></div>
                      </div>
                      <div className="absolute left-8 top-6 w-40 h-28 rotate-2 border border-border rounded-md bg-white dark:bg-card p-3 shadow-sm">
                        <div className="text-[10px] text-muted-foreground mb-1">
                          Back
                        </div>
                        <div className="h-2 w-3/4 bg-muted rounded mb-1"></div>
                        <div className="h-2 w-1/2 bg-muted rounded mb-1"></div>
                        <div className="h-2 w-4/6 bg-muted rounded"></div>
                      </div>

                      <div className="absolute right-1 top-1 w-44 border border-border rounded-md bg-white dark:bg-card p-3 shadow-sm">
                        <div className="text-[10px] text-muted-foreground mb-2">
                          Multiple Choice
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-6 rounded border border-border" />
                          <div className="h-6 rounded border border-primary bg-primary/10" />
                          <div className="h-6 rounded border border-border" />
                          <div className="h-6 rounded border border-border" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div
                className="group relative bg-card border cursor-default border-border rounded-xl p-6 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Target className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Deck Organization
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Lightweight, glanceable organization preview with a playful
                    layout.
                  </p>

                  <div className="bg-white rounded-lg shadow-sm border border-border p-4 h-full">
                    <div className="relative h-40 sm:h-44">
                      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/10" />
                      <div className="absolute top-4 -right-3 w-16 h-16 rounded-full bg-primary/5" />

                      <div className="absolute left-1 top-1 rotate-2 w-40 h-20 rounded-md border border-border bg-white dark:bg-card shadow-sm p-2">
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <CardsIcon size={10} />
                          </div>
                          <span>Deck</span>
                        </div>
                        <Skeleton className="h-1.5 w-28 mb-1" />
                        <div className="flex gap-1 mt-1">
                          <Skeleton className="h-4 w-10 rounded" />
                          <Skeleton className="h-4 w-14 rounded" />
                        </div>
                      </div>

                      <div className="absolute left-32 top-6 -rotate-1 w-44 h-20 rounded-md border border-border bg-white dark:bg-card shadow-sm p-2">
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <CardsIcon size={10} />
                          </div>
                          <span>Deck</span>
                        </div>
                        <Skeleton className="h-1.5 w-32 mb-1" />
                        <Skeleton className="h-1.5 w-24" />
                      </div>

                      <div className="absolute left-12 bottom-2 rotate-1 w-40 h-16 rounded-md border border-border bg-white dark:bg-card shadow-sm p-2">
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <CardsIcon size={10} />
                          </div>
                          <span>Deck</span>
                        </div>
                        <Skeleton className="h-1.5 w-28" />
                      </div>

                      <div className="absolute right-8 top-2 rotate-3 w-36 h-16 rounded-md border border-border bg-white dark:bg-card shadow-sm p-2">
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <CardsIcon size={10} />
                          </div>
                          <span>Deck</span>
                        </div>
                        <Skeleton className="h-1.5 w-24" />
                      </div>

                      <div className="absolute right-1 bottom-1 -rotate-2 w-44 h-20 rounded-md border border-border bg-white dark:bg-card shadow-sm p-2">
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <CardsIcon size={10} />
                          </div>
                          <span>Deck</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-1.5 w-24" />
                          <Skeleton className="h-4 w-10 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </motion.div>

              <motion.div
                className="group relative bg-card border cursor-default border-border rounded-xl p-6 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Clock className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Study Sessions
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Track time on task and accuracy at a glance.
                  </p>

                  <div className="bg-white rounded-lg shadow-sm border border-border p-4 flex flex-col">
                    <div className="grid grid-cols-5 gap-4 items-start mb-3">
                      <div className="col-span-2">
                        <div className="relative w-28 h-28 mx-auto">
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "conic-gradient(hsl(var(--primary)) 0% 62%, hsl(var(--muted)) 62% 100%)",
                            }}
                          />
                          <div className="absolute inset-2 rounded-full bg-background border border-border flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xl font-semibold text-foreground">
                                45
                              </div>
                              <div className="text-xs text-muted-foreground">
                                min
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-center mb-3">
                          <div className="text-sm font-medium text-foreground">
                            Today's Session
                          </div>
                        </div>
                        <div className="space-y-2 text-xs mb-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Cards reviewed:
                            </span>
                            <span className="text-foreground font-medium">
                              32
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Accuracy:
                            </span>
                            <span className="text-foreground font-medium">
                              92%
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-primary text-primary-foreground"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start Session
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                      <div className="rounded bg-muted/30 px-2 py-1 text-center">
                        Streak 5d
                      </div>
                      <div className="rounded bg-muted/30 px-2 py-1 text-center">
                        Focus 84%
                      </div>
                      <div className="rounded bg-muted/30 px-2 py-1 text-center">
                        Sessions 3
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
