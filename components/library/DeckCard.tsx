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
import { formatDate } from "@common/utils/date.utils";

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
    <Card>
      <CardContent className="p-6 cursor-default">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-xl text-foreground line-clamp-1 hover:text-primary transition-colors duration-300 cursor-pointer" onClick={() => router.push(`/workspace/deck/edit/${deck.id}`)}>
                {deck.name}
              </h3>
              <Badge
                variant={deck.visibility === "public" ? "default" : "secondary"}
                className="text-xs font-semibold px-2 py-1 rounded-full"
              >
                {deck.visibility === "public" ? "Public" : "Private"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed min-h-[45.5px]">
              {deck.description || "No description available"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
            <div className="p-2 rounded-lg bg-muted">
              <CreditCard className="h-4 w-4 text-primary rotate-180" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground">
                {deck.flashcards?.length || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
            <div className="p-2 rounded-lg bg-muted">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground">
                {deck.progress?.completedSessions || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                Sessions
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-muted/40 via-muted/20 to-transparent border border-border/40 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">
                Mastery Progress
              </span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-bold text-primary`}>
                {deck.progress?.mastery || 0}%
              </span>
              <p className="text-xs text-muted-foreground font-medium">
                {deck.progress?.lastStudied
                  ? formatDate(deck.progress.lastStudied)
                  : "Never"}
              </p>
            </div>
          </div>

          <Progress
            value={deck.progress?.mastery || 0}
            className="w-full h-2 rounded-full"
          />
        </div>

        <div className="flex gap-3">
          <Link href={`/workspace/deck/edit/${deck.id}`} passHref className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full font-semibold rounded-xl border hover:bg-muted transition-all duration-300"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>

          <Dialog
            open={showStudyModeDialog}
            onOpenChange={setShowStudyModeDialog}
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="flex-1 font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="h-4 w-4 mr-2" />
                Study
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-2xl">
              <DialogHeader className="space-y-4 pb-6">
                <DialogTitle className="text-2xl font-bold">
                  Choose Study Mode
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                  Select the perfect study method for your learning goals
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div
                  className="group/mode flex items-center gap-5 p-5 border-2 border-border/40 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleStudyModeSelect("flip")}
                >
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl group-hover/mode:scale-110 transition-transform duration-300">
                    <FlipHorizontal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      Classic Flip
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Simple flashcard flipping for quick review and
                      memorization
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-1 transition-all duration-300" />
                </div>

                <div
                  className="group/mode flex items-center gap-5 p-5 border-2 border-border/40 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleStudyModeSelect("challenge")}
                >
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl group-hover/mode:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      Challenge Mode
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Test your knowledge with multiple choice challenges and
                      compete
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-1 transition-all duration-300" />
                </div>

                <div
                  className="group/mode flex items-center gap-5 p-5 border-2 border-border/40 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleStudyModeSelect("quiz")}
                >
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl group-hover/mode:scale-110 transition-transform duration-300">
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-foreground">
                        Adaptive Quiz
                      </h3>
                      <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1 font-bold rounded-full">
                        <Zap className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Smart quizzes that adapt to your learning progress and
                      weak spots
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-1 transition-all duration-300" />
                </div>

                <div className="mt-6 p-5 bg-muted/60 rounded-2xl border-2 border-border/30">
                  <h4 className="text-sm font-bold flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    Adaptive Quiz Requirements
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-12">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                      Complete Challenge Mode at least 3 times
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                      Achieve at least 10% mastery in this deck
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                      Have at least 1 energy available
                    </li>
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
