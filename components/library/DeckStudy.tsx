"use client";

import { useState } from "react";
import { Deck, User } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { StudyModeDialog } from "components/study";
import { useRouter } from "next/navigation";
import { Target, Play } from "lucide-react";
import ChallengeSettings from "components/study/dialogs/ChallengeSettings";
import AdaptiveQuizSettings from "components/study/dialogs/AdaptiveQuizSettings";

export const DeckStudy = ({ deck, user }: { deck: Deck; user: User }) => {
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
    <Card className="border-muted-foreground/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Study Deck
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a study method to review your flashcards
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <StudyModeDialog
            open={showStudyModeDialog}
            onOpenChange={setShowStudyModeDialog}
            onStudyModeSelect={handleStudyModeSelect}
            triggerText="Study Now"
            triggerIcon={<Play className="h-4 w-4 mr-2" />}
            className="w-full font-medium"
          />
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
