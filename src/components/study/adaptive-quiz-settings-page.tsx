"use client";

import { useState } from "react";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Alert, AlertDescription } from "@ui/alert";
import { Brain, Zap, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";

interface AdaptiveQuizSettingsPageProps {
  deck: Deck;
  onStartQuiz: (numQuestions: number) => Promise<{ success: boolean; error?: string }>;
  error?: string | null;
}

export const AdaptiveQuizSettingsPage = ({
  deck,
  onStartQuiz,
  error: externalError,
}: AdaptiveQuizSettingsPageProps) => {
  const [numOfQuestions, setNumOfQuestions] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleStartQuiz = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const result = await onStartQuiz(numOfQuestions);

      if (!result.success) setIsGenerating(false);
      
    } catch (error) {
      console.error("Error starting quiz:", error);
      setError("An error occurred while starting the quiz");
      setIsGenerating(false);
    }
  };

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
          <CardTitle className="flex items-center gap-2 w-full">
            <Brain className="h-5 w-5 text-primary" />
            Quiz Configuration
          </CardTitle>
          <p className="text-muted-foreground">
          Smart quizzes that adapt to your progress
        </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/40 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">{deck.name}</h3>
            <p className="text-sm text-muted-foreground">
              {deck.flashcards?.length || 0} flashcards available for quiz generation
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Number of Questions</h3>
            <RadioGroup
              value={numOfQuestions.toString()}
              onValueChange={(value) => setNumOfQuestions(parseInt(value))}
              className="grid grid-cols-3 gap-3"
            >
              <div>
                <RadioGroupItem value="10" id="q1" className="peer sr-only" />
                <Label
                  htmlFor="q1"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                >
                  <span className="text-lg font-semibold">10</span>
                  <span className="text-xs text-muted-foreground">Quick</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="15" id="q2" className="peer sr-only" />
                <Label
                  htmlFor="q2"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                >
                  <span className="text-lg font-semibold">15</span>
                  <span className="text-xs text-muted-foreground">Standard</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="20" id="q3" className="peer sr-only" />
                <Label
                  htmlFor="q3"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                >
                  <span className="text-lg font-semibold">20</span>
                  <span className="text-xs text-muted-foreground">Comprehensive</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How Adaptive Quiz Works
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• AI generates personalized questions based on your flashcards</li>
              <li>• Questions adapt to your knowledge level and progress</li>
              <li>• Get immediate feedback and explanations</li>
              <li>• Track mastery improvement with each correct answer</li>
            </ul>
          </div>
          <span className="text-xs text-muted-foreground">Quiz generation will cost <Zap className="h-3 w-3 text-primary inline-block"/> 1 Energy</span>

          {(externalError || error) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{externalError || error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleStartQuiz}
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Generate Quiz
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
