import { Clock, Plus, BookOpen, Brain, Target, Zap, TrendingUp, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export function FeatureShowcase() {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-foreground">
              Study smarter, not harder — no delays, just results.
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Transform your learning with AI-powered flashcards that adapt to your pace, track your progress, and help you master any subject faster than ever before.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group relative bg-card border cursor-default border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <CardsIcon size={20} />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  AI Flashcard Generation
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Transform your notes into perfectly formatted flashcards in seconds using advanced AI technology.
                </p>

                <div className="relative">
                  <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                    <div className="text-center mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CardsIcon size={16} className="text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">Creating flashcards...</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-primary/20 rounded w-full"></div>
                      <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                      <div className="h-2 bg-primary/20 rounded w-1/2"></div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground text-center">
                      AI analyzing your notes...
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-full h-full bg-card rounded-lg shadow-sm border border-border -z-10 transform rotate-1"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-full h-full bg-card rounded-lg shadow-sm border border-border -z-20 transform rotate-0.5"></div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
            </div>

            <div className="group relative bg-card border cursor-default border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  Smart Progress Tracking
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Monitor your mastery with detailed analytics and see which topics need more attention.
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Study Progress</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-primary">87%</span>
                      <span className="text-xs text-green-500">↑ 15%</span>
                    </div>
                  </div>
                  <Progress value={87} className="w-full h-2 mb-2" />
                  <p className="text-xs text-muted-foreground mb-3">Great progress on Biology deck!</p>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground">
                    <Play className="w-3 h-3 mr-1" />
                    Continue Study
                  </Button>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
            </div>

            <div className="group relative bg-card border cursor-default border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Brain className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  Multiple Study Modes
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Choose from Review, Quiz, or Practice modes with adaptive difficulty that learns from your performance.
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-border p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Classic Flip Mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Challenge Mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Adaptive Quiz Mode</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative bg-card border cursor-default border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Target className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  Deck Organization
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Organize your study materials with custom decks, tags, and categories for easy access.
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">My Decks</span>
                    <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                      <Plus className="w-2 h-2 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                      <CardsIcon size={12} className="text-primary" />
                      <span className="text-foreground">Biology Fundamentals</span>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">42 cards</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                      <CardsIcon size={12} className="text-primary" />
                      <span className="text-foreground">Chemistry Basics</span>
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">28 cards</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                      <CardsIcon size={12} className="text-primary" />
                      <span className="text-foreground">Math Formulas</span>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">35 cards</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
            </div>

            <div className="group relative bg-card border cursor-default border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 p-3 rounded-lg mb-4 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  Study Sessions
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Track your study time and sessions with detailed statistics to monitor your learning progress.
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <div className="text-center mb-3">
                    <div className="text-sm font-medium text-foreground">Today's Session</div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time studied:</span>
                      <span className="text-foreground font-medium">45 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cards reviewed:</span>
                      <span className="text-foreground font-medium">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="text-foreground font-medium">92%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-primary text-primary-foreground">
                    <Play className="w-3 h-3 mr-1" />
                    Start Session
                  </Button>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
            </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
