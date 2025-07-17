import { Button } from "components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "components/ui/Dialog";
import { Label } from "components/ui/Label";
import { RadioGroup, RadioGroupItem } from "components/ui/Radio-group";
import { useState } from "react";
import { createQuizAccessTokenAction } from "actions/ai-study.actions";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "components/ui/Alert";

interface AdaptiveQuizSettingsProps {
  showQuizSettings: boolean;
  setShowQuizSettings: (open: boolean) => void;
  numOfQuestions: number;
  setNumOfQuestions: (num: number) => void;
  deckId: string;
}

const AdaptiveQuizSettings = ({
  showQuizSettings,
  setShowQuizSettings,
  numOfQuestions,
  setNumOfQuestions,
  deckId
}: AdaptiveQuizSettingsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleStartQuiz = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const result = await createQuizAccessTokenAction(deckId, numOfQuestions);
      
      if (!result.success || !result.token) {
        setError(result.message || "Failed to create quiz access token");
        setIsGenerating(false);
        return;
      }
      
      router.push(`/workspace/study/quiz?deckId=${deckId}&token=${result.token}`);
    } catch (error) {
      console.error("Error starting quiz:", error);
      setError("An error occurred while starting the quiz");
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={showQuizSettings} onOpenChange={setShowQuizSettings}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adaptive Quiz Generation</DialogTitle>
          <DialogDescription>
            Configure your Adaptive Quiz session
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="space-y-4">
            <h3 className="font-medium">Number of Questions</h3>
            <RadioGroup
              value={numOfQuestions.toString()}
              onValueChange={(value) => setNumOfQuestions(parseInt(value))}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem value="10" id="q1" className="peer sr-only" />
                <Label
                  htmlFor="q1"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>10</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="15" id="q2" className="peer sr-only" />
                <Label
                  htmlFor="q2"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>15</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="20" id="q3" className="peer sr-only" />
                <Label
                  htmlFor="q3"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>20</span>
                </Label>
              </div>
            </RadioGroup>
            <span className="text-xs text-muted-foreground">
              This will cost 1 Lumix credit
            </span>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handleStartQuiz} 
            className="w-full" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Requirements...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AdaptiveQuizSettings;
