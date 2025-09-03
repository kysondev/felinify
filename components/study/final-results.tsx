import React, { ReactNode } from "react";
import { Button } from "components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { formatTime } from "@common/utils/date.utils";
import { redirect } from "next/navigation";

interface FinalResultsProps {
  correctAnswers: number;
  incorrectAnswers: number;
  totalCards: number;
  studyTime: number;
  masteryGained: number;
  masteryChangeText?: string;
  isSaving: boolean;
  onFinish?: () => Promise<void>;
  explanationText?: ReactNode;
}

/**  The FinalResults component displays the final results of a study session (challenge mode or adaptive quiz mode).
 * It shows the user's performance, including correct and incorrect answers, total questions, study time, and mastery gained.
 */
export const FinalResults = ({
  correctAnswers,
  incorrectAnswers,
  totalCards,
  studyTime,
  masteryGained,
  masteryChangeText,
  isSaving,
  onFinish,
  explanationText,
}: FinalResultsProps) => {
  const accuracy = Math.round((correctAnswers / totalCards) * 100);

  const handleReturn = async () => {
    if (onFinish) {
      await onFinish();
    } else {
      redirect("/workspace/library");
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Study Session Complete!</h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 max-w-md">
            <div className="text-6xl font-bold text-primary mb-4">
              {accuracy}%
            </div>
            <div className="text-lg text-muted-foreground mb-6">
              Final Score
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Correct</span>
                </div>
                <span className="font-semibold text-green-500">
                  {correctAnswers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Incorrect</span>
                </div>
                <span className="font-semibold text-red-500">
                  {incorrectAnswers}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Questions</span>
                  <span className="font-semibold">{totalCards}</span>
                </div>
              </div>  

              <div className="flex items-center justify-between">
                <span className="font-medium">Study Time</span>
                <span className="font-semibold">{formatTime(studyTime)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Mastery Gained</span>
                <span className="font-semibold text-primary">
                  {masteryChangeText &&
                    `${masteryGained > 0 ? "+" : ""}${masteryGained}%`}
                </span>
              </div>

              {explanationText || (
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <p>+1% mastery for each correct answer</p>
                  <p>-1% mastery for each incorrect answer</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleReturn}
          className="min-w-[200px]"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Return to Library"}
        </Button>
      </div>
    </div>
  );
};
