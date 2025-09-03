"use client";

import { useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Label } from "components/ui/label";
import { Switch } from "components/ui/switch";
import { Timer, Award, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";

interface ChallengeSettingsPageProps {
  deck: Deck;
  handleStartChallenge: (isTimed: boolean) => void;
}

export const ChallengeSettingsPage = ({
  deck,
  handleStartChallenge,
}: ChallengeSettingsPageProps) => {
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container max-w-2xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-4 p-2 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Challenge Configuration
          </CardTitle>
          <p className="text-muted-foreground">
          Test your knowledge with multiple choice questions
        </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/40 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">{deck.name}</h3>
            <p className="text-sm text-muted-foreground">
              {deck.flashcards?.length || 0} flashcards available for challenge
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="timed-mode" className="text-base font-medium">
                Timed Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Add time pressure to make the challenge more intense
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="timed-mode"
                checked={isTimed}
                onCheckedChange={setIsTimed}
                className="data-[state=checked]:bg-primary"
              />
              <Timer
                className={`h-5 w-5 ${
                  isTimed ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How Challenge Mode Works
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Answer multiple choice questions based on your flashcards</li>
              <li>• Get immediate feedback on your answers</li>
              <li>• Track your progress and mastery improvement</li>
              <li>• {isTimed ? "Limited time per question adds extra challenge" : "Take your time to think through each answer"}</li>
            </ul>
          </div>

          <Button
            onClick={() => handleStartChallenge(isTimed)}
            className="w-full"
          >
            <Award className="h-5 w-5 mr-2" />
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
