"use client";

import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Deck, User } from "db/types/models.types";
import { BookOpen, Clock, FlipHorizontal, Brain, Award } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "components/ui/Progress";
import { Badge } from "components/ui/Badge";
import ChallengeSettings from "components/study/dialogs/ChallengeSettings";
import AdaptiveQuizSettings from "components/study/dialogs/AdaptiveQuizSettings";

export const DeckCard = ({ deck, user }: { deck: Deck, user: User }) => {
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
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{deck.name}</CardTitle>
        <CardDescription className="truncate">
          {deck.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {deck.flashcards?.length} cards
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {deck.progress?.lastStudied
              ? new Date(deck.progress.lastStudied as Date).toLocaleDateString()
              : "Never"}
          </span>
        </div>
        <Progress
          value={deck.progress?.mastery || 0}
          className="w-full h-2 rounded-full overflow-hidden transition-all duration-1000"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {deck.progress?.mastery || 0}% mastery
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Link href={`/workspace/deck/${deck.id}`} passHref>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
        <Dialog
          open={showStudyModeDialog}
          onOpenChange={setShowStudyModeDialog}
        >
          <DialogTrigger asChild>
            <Button size="sm">Study Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Choose Study Mode</DialogTitle>
              <DialogDescription>
                Select how you want to study this deck
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => handleStudyModeSelect("flip")}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <FlipHorizontal className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Classic Flip</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple flashcard flipping for quick review
                  </p>
                </div>
              </div>

              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => handleStudyModeSelect("challenge")}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Challenge Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Test what you have learned with multiple choice challenges
                  </p>
                </div>
              </div>

              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => handleStudyModeSelect("quiz")}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">
                    Adaptive Quiz Mode <Badge>AI</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quiz you on cards you need to practice based on past
                    performance
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
      </CardFooter>
    </Card>
  );
};
