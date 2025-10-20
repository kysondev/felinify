"use client";

import { Card, CardContent } from "@ui/card";
import { Badge } from "@ui/badge";
import { 
  ArrowRight,
  Brain,
  Zap,
  FileUp,
} from "lucide-react";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { motion } from "framer-motion";

export function FlashcardShowcase() {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateY: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <SubscriptionPopup 
        open={showSubscriptionPopup} 
        setOpen={setShowSubscriptionPopup} 
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold lg:text-4xl text-foreground mb-0">
                  Two Powerful Ways To Create Flashcards
                </h2>
              </motion.div>
              <motion.div className="lg:pt-2" variants={itemVariants}>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Whether you prefer hands-on control or lightning-fast automation, Felinify adapts to your learning style and workflow.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            
            <motion.div variants={cardVariants}>
              <Card className="group relative p-8 border-muted-foreground/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
                
                <div className="relative z-10 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Manual Creation
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Build your perfect study set card by card. Add images, format text, and organize everything exactly how you want it.
                    </p>
                  </div>

                  <motion.div 
                    className="relative w-full max-w-lg mx-auto mt-8" 
                    style={{ height: '480px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                  <div>
                    <Card className="overflow-hidden absolute left-0 top-8 w-[75%] h-[280px] border-primary/10 hover:border-primary/30 cursor-pointer origin-top-left hover:shadow-lg transition-all duration-200" style={{ transform: 'rotate(-6deg)' }}>
                    <CardContent className="p-5 flex flex-col flex-grow h-full">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className="px-2.5 py-0.5">Term</Badge>
                      </div>
                      <div className="flex-grow flex flex-col justify-center min-h-[100px] my-2">
                        <p className="break-words font-medium">Prompt Engineering</p>
                      </div>
                      <div className="flex justify-between items-center border-t mt-4 pt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <FileUp className="h-3 w-3 text-primary/70" />
                          Click to reveal definition
                        </div>
                        <ArrowRight className="h-3 w-3 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                  <div>
                    <Card className="overflow-hidden absolute right-0 bottom-0 w-[75%] h-[280px] border-primary/10 hover:border-primary/30 cursor-pointer origin-bottom-right hover:shadow-lg transition-all duration-200" style={{ transform: 'rotate(6deg)' }}>
                    <CardContent className="p-5 flex flex-col flex-grow h-full">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className="px-2.5 py-0.5">Term</Badge>
                      </div>
                      <div className="flex-grow flex flex-col justify-center min-h-[100px] my-2">
                        <p className="break-words font-medium">What is photosynthesis?</p>
                      </div>
                      <div className="flex justify-between items-center border-t mt-4 pt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <FileUp className="h-3 w-3 text-primary/70" />
                          Click to reveal definition
                        </div>
                        <ArrowRight className="h-3 w-3 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                  </div>

                  <div>
                    <Card className="overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[320px] shadow-xl border-primary/10 hover:border-primary/30 cursor-pointer group z-10 hover:shadow-2xl transition-all duration-200">
                    <CardContent className="p-5 flex flex-col flex-grow h-full">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className="px-2.5 py-0.5">Term</Badge>
                      </div>
                      <div className="flex-grow flex flex-col justify-center min-h-[100px] my-2">
                        <p className="break-words font-medium text-lg">
                          What is the function of mitochondria in cellular respiration?
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t mt-4 pt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <FileUp className="h-3 w-3 text-primary/70" />
                          Click to reveal definition
                        </div>
                        <ArrowRight className="h-3 w-3 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                </motion.div>
              </div>
            </Card>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={cardVariants}>
            <Card className="group relative p-8 border-muted-foreground/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      2
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      AI Generation
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Upload your notes or paste any text. Our AI instantly transforms it into perfectly formatted flashcards in seconds.
                  </p>
                </div>
                <div className="relative w-full max-w-lg mx-auto" style={{ height: '480px' }}>
                  <Card className="overflow-hidden absolute left-1/2 -translate-x-1/2 top-12 w-[90%] h-[350px] border-primary/10 cursor-pointer origin-center animate-pulse" style={{ transform: 'translateX(-50%) rotate(-3deg)', animationDelay: '200ms' }}>
                    <CardContent className="p-6 flex flex-col flex-grow h-full">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-6 w-20 bg-muted rounded"></div>
                        <div className="h-6 w-6 bg-muted rounded-full"></div>
                      </div>
                      <div className="flex-grow flex flex-col justify-center space-y-4">
                        <div className="space-y-3">
                          <div className="h-5 bg-muted rounded w-full"></div>
                          <div className="h-5 bg-muted rounded w-4/5"></div>
                          <div className="h-5 bg-muted rounded w-3/5"></div>
                        </div>
                        <div className="mt-6 space-y-2">
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden absolute left-1/2 -translate-x-1/2 bottom-8 w-[92%] h-[380px] shadow-2xl border-primary/20 cursor-pointer group z-10" style={{ transform: 'translateX(-50%) rotate(2deg)' }}>
                    <CardContent className="p-6 flex flex-col flex-grow h-full">
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary" className="px-3 py-1">
                          <Brain className="h-4 w-4 mr-1.5" />
                          AI Generating
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="space-y-5">
                          {/* Animated dots */}
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
                            <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                            <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                          </div>
                          
                          {/* Skeleton lines */}
                          <div className="space-y-3 px-4">
                            <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse"></div>
                            <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse w-11/12" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse w-4/5" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          
                          {/* Progress section */}
                          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-foreground">
                                Analyzing your content...
                              </p>
                              <span className="text-sm font-bold text-primary">60%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Creating 15 flashcards from 3 pages
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-border pt-4 mt-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>Powered by AI</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Est. 30 seconds
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
