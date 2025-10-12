"use client";

import { useState } from "react";
import { Deck, User } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { StudyModeDialog } from "components/study";
import { useRouter } from "next/navigation";
import { Target, Play } from "lucide-react";



export const DeckStudy = ({ deck, user }: { deck: Deck; user: User }) => {
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);

  const router = useRouter();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/study/flip?deckId=${deck.id}`);
    }
    if (mode === "challenge") {
      router.push(`/study/challenge?deckId=${deck.id}`);
    }
    if (mode === "quiz") {
      router.push(`/study/quiz?deckId=${deck.id}`);
    }
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



    </Card>
  );
};
