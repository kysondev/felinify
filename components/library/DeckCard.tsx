"use client";

import { Button } from "components/ui/Button";
import { Card, CardContent } from "components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Deck, User } from "db/types/models.types";
import {
  BookOpen,
  Calendar,
  FlipHorizontal,
  Brain,
  Award,
  TrendingUp,
  Edit3,
  Play,
  ChevronRight,
  Target,
  Zap,
  Info,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "components/ui/Progress";
import { Badge } from "components/ui/Badge";
import ChallengeSettings from "components/study/dialogs/ChallengeSettings";
import AdaptiveQuizSettings from "components/study/dialogs/AdaptiveQuizSettings";
import { formatDate } from "utils/date.utils";

export const DeckCard = ({ deck, user }: { deck: Deck; user: User }) => {
  const [numOfRounds, setNumOfRounds] = useState<number>(3);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(10);
  const [showChallengeSettings, setShowChallengeSettings] =
    useState<boolean>(false);
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);
  const [showQuizSettings, setShowQuizSettings] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const router = useRouter();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deck.id}`);
    }
    if (mode === "challenge") {
      setSelectedMode(mode);
      setShowStudyModeDialog(false);
      setShowChallengeSettings(true);
    }
    if (mode === "quiz") {
      setSelectedMode(mode);
      setShowStudyModeDialog(false);
      setShowQuizSettings(true);
    }
  };

  const handleStartStudy = () => {
    router.push(
      `/workspace/study/${selectedMode}?deckId=${deck.id}&numOfRounds=${numOfRounds}&timed=${isTimed}`
    );
  };

  return (
    <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {deck.name}
          </h3>
          <span className="text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs font-medium">
              {deck.visibility === "public" ? "Public" : "Private"}
            </Badge>
          </span>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-2 min-h-[40px] leading-relaxed">
          {deck.description || "No description available"}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-muted rounded-md">
                <CreditCard className="h-4 w-4 text-primary rotate-180" />
              </div>
            </div>
            <p className="text-xs font-bold text-foreground">
              {deck.flashcards?.length || 0}
            </p>
            <p className="text-xs text-muted-foreground">Cards</p>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-muted rounded-md">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
            </div>
            <p className="text-xs font-bold text-foreground">
              {deck.progress?.lastStudied
                ? formatDate(deck.progress.lastStudied)
                : "Never"}
            </p>
            <p className="text-xs text-muted-foreground">Last Study</p>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-muted rounded-md">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-xs font-bold text-foreground">
              {deck.progress?.completedSessions || 0}
            </p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border/60 bg-muted/50 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Mastery Progress
              </span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {deck.progress?.mastery || 0}%
            </span>
          </div>

          <Progress
            value={deck.progress?.mastery || 0}
            className="w-full h-2"
          />
        </div>

        <div className="flex gap-3">
          <Link href={`/workspace/deck/${deck.id}`} passHref className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Deck
            </Button>
          </Link>

          <Dialog
            open={showStudyModeDialog}
            onOpenChange={setShowStudyModeDialog}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 font-medium">
                <Play className="h-4 w-4 mr-2" />
                Study Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-semibold">
                  Choose Study Mode
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Select the perfect study method for your learning goals
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div
                  className="group/mode flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                  onClick={() => handleStudyModeSelect("flip")}
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover/mode:scale-105 transition-transform">
                    <FlipHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">
                      Classic Flip
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Simple flashcard flipping for quick review and
                      memorization
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/mode:text-foreground group-hover/mode:translate-x-1 transition-all" />
                </div>

                <div
                  className="group/mode flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                  onClick={() => handleStudyModeSelect("challenge")}
                >
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover/mode:scale-105 transition-transform">
                    <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">
                      Challenge Mode
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Test your knowledge with multiple choice challenges and
                      compete
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/mode:text-foreground group-hover/mode:translate-x-1 transition-all" />
                </div>

                <div
                  className="group/mode flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                  onClick={() => handleStudyModeSelect("quiz")}
                >
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover/mode:scale-105 transition-transform">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        Adaptive Quiz
                      </h3>
                      <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-semibold">
                        <Zap className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Smart quizzes that adapt to your learning progress and
                      weak spots
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/mode:text-foreground group-hover/mode:translate-x-1 transition-all" />
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary" />
                    Adaptive Quiz Requirements
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Complete Challenge Mode at least 3 times</li>
                    <li>Achieve at least 10% mastery in this deck</li>
                    <li>Have at least 1 energy available</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      <ChallengeSettings
        showChallengeSettings={showChallengeSettings}
        setShowChallengeSettings={setShowChallengeSettings}
        handleStartStudy={handleStartStudy}
        numOfRounds={numOfRounds}
        setNumOfRounds={setNumOfRounds}
        isTimed={isTimed}
        setIsTimed={setIsTimed}
      />
      <AdaptiveQuizSettings
        showQuizSettings={showQuizSettings}
        setShowQuizSettings={setShowQuizSettings}
        numOfQuestions={numOfQuestions}
        setNumOfQuestions={setNumOfQuestions}
        deckId={deck.id}
        user={user}
      />
    </Card>
  );
};
