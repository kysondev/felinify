"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChallengeSettings from "components/study/dialogs/challenge-settings";
import AdaptiveQuizSettings from "components/study/dialogs/adaptive-quiz-settings";
import { StudyModeDialog } from "components/study";
import { Play } from "lucide-react";
import { User } from "db/types/models.types";

interface ExploreDeckStudyOptionsProps {
  deckId: string;
  user: User;
}

export default function ExploreDeckStudyOptions({
  deckId,
  user,
}: ExploreDeckStudyOptionsProps) {
  const router = useRouter();
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);
  const [showChallengeSettings, setShowChallengeSettings] =
    useState<boolean>(false);
  const [showQuizSettings, setShowQuizSettings] = useState<boolean>(false);
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>("");

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deckId}`);
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
      `/workspace/study/${selectedMode}?deckId=${deckId}&timed=${isTimed}`
    );
  };

  return (
    <>
      <StudyModeDialog
        open={showStudyModeDialog}
        onOpenChange={setShowStudyModeDialog}
        onStudyModeSelect={handleStudyModeSelect}
        triggerText="Study Deck"
        triggerIcon={<Play className="h-4 w-4 mr-2" />}
        className="w-full"
      />

      <ChallengeSettings
        showChallengeSettings={showChallengeSettings}
        setShowChallengeSettings={setShowChallengeSettings}
        handleStartStudy={handleStartStudy}
        isTimed={isTimed}
        setIsTimed={setIsTimed}
      />
      {user && (
        <AdaptiveQuizSettings
          showQuizSettings={showQuizSettings}
          setShowQuizSettings={setShowQuizSettings}
          numOfQuestions={10}
          setNumOfQuestions={() => {}}
          deckId={deckId}
          user={user}
        />
      )}
    </>
  );
}
