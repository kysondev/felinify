"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StudyModeDialog } from "components/study";
import { Play } from "lucide-react";

interface ExploreDeckStudyOptionsProps {
  deckId: string;
}

export default function ExploreDeckStudyOptions({
  deckId
}: ExploreDeckStudyOptionsProps) {
  const router = useRouter();
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deckId}`);
    }
    if (mode === "challenge") {
      router.push(`/workspace/study/challenge?deckId=${deckId}`);
    }
    if (mode === "quiz") {
      router.push(`/workspace/study/quiz?deckId=${deckId}`);
    }
  };

  return (
      <StudyModeDialog
        open={showStudyModeDialog}
        onOpenChange={setShowStudyModeDialog}
        onStudyModeSelect={handleStudyModeSelect}
        triggerText="Study Deck"
        triggerIcon={<Play className="h-4 w-4 mr-2" />}
        className="w-full"
      />
  );
}
