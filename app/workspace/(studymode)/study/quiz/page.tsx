"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDeckById } from "@deck/services/deck.service";
import { getUser } from "@user/services/user.service";
import { Button } from "components/ui/Button";
import { MultipleChoiceOptions } from "components/study/MultipleChoiceOptions";
import { QuestionCard } from "components/study/QuestionCard";
import { SessionHeader } from "components/study/SessionHeader";
import { FinalResults } from "components/study/FinalResults";
import { ErrorState } from "components/study/states/ErrorState";
import { Progress } from "components/ui/Progress";
import { Loader2 } from "lucide-react";
import { useQuizEngine } from "@study/engines/quiz/useQuizEngine";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  const token = searchParams.get("token");

  const [deck, setDeck] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<
    "validating-token" | "loading-deck" | "generating-quiz" | "complete"
  >("validating-token");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [prepError, setPrepError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const userResult = await getUser();
        if (!userResult.success || !userResult.data) {
          setPrepError("User not authenticated");
          return;
        }
        setUserId(userResult.data.id);
        setLoadingProgress(10);
        setLoadingStage("loading-deck");

        if (!deckId) {
          setPrepError("Invalid quiz session");
          return;
        }
        const deckResult = await getDeckById(deckId, userResult.data.id);
        if (!deckResult.success || !deckResult.data) {
          setPrepError("Deck not found");
          return;
        }
        if (
          deckResult.data.visibility !== "public" &&
          deckResult.data.userId !== userResult.data.id
        ) {
          setPrepError("You don't have permission to access this deck");
          return;
        }
        setDeck(deckResult.data);
        setLoadingStage("generating-quiz");
        setLoadingProgress(60);
      } catch (e) {
        setPrepError("An error occurred while preparing the quiz");
      }
    };
    run();
  }, [deckId]);

  // Bridge: The engine manages the heavy logic; we keep stage/progress UI here
  const { state, actions } = useQuizEngine({
    deck,
    userId,
    initialMastery: deck?.progress?.mastery || 0,
    deckId,
    token,
  });

  useEffect(() => {
    if (!state.isLoading && loadingStage !== "complete") {
      setLoadingStage("complete");
      setLoadingProgress(100);
    }
  }, [state.isLoading, loadingStage]);

  if (state.isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />

          <h2 className="text-xl font-medium mb-2">Preparing Your Quiz</h2>

          <div className="w-full mb-3">
            <Progress value={loadingProgress} className="h-1.5" />
          </div>

          <p className="text-sm text-muted-foreground">
            {loadingStage === "validating-token" && "Loading quiz session..."}
            {loadingStage === "loading-deck" && "Loading your flashcards..."}
            {loadingStage === "generating-quiz" &&
              "Creating personalized questions..."}
            {loadingStage === "complete" && "Starting quiz..."}
          </p>
          <span className="text-xs text-muted-foreground mt-1">
            This may take a moment, please don't refresh the page.
          </span>
        </div>
      </div>
    );
  }

  if (prepError) {
    return (
      <ErrorState
        title={
          prepError.includes("permission")
            ? "Access Denied"
            : "Cannot Start Adaptive Quiz"
        }
        message={prepError}
        buttonText="Return to Library"
        buttonAction={actions.goToLibrary}
      />
    );
  }

  if (state.savingResults) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
          </div>

          <h2 className="text-xl font-medium mb-2">Saving Your Results</h2>

          <p className="text-sm text-muted-foreground">
            Updating your progress and calculating mastery...
          </p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <ErrorState
        title={
          state.error.includes("Invalid access token")
            ? "Unauthorized Access"
            : "Cannot Start Adaptive Quiz"
        }
        message={state.error}
        buttonText="Return to Library"
        buttonAction={actions.goToLibrary}
      />
    );
  }

  if (state.quizCompleted) {
    return (
      <FinalResults
        correctAnswers={state.correctAnswers}
        incorrectAnswers={state.incorrectAnswers}
        totalQuestions={state.quizQuestions.length}
        studyTime={state.studyTime}
        masteryGained={state.masteryGained}
        masteryChangeText={`${state.masteryGained}%`}
        isSaving={false}
        onFinish={async () => {
          actions.goToLibrary();
        }}
        explanationText={
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            <p>+1% mastery for each correct answer</p>
            <p>-1% mastery for each incorrect answer</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 min-h-[calc(100vh-80px)] flex flex-col mt-20">
      <SessionHeader
        deck={{
          name: deck?.name || "",
          description: deck?.description,
        }}
        studyTime={state.studyTime}
        totalProgress={state.totalProgress}
        handleEndSession={actions.handleEndSession}
        correctAnswers={state.correctAnswers}
        currentCardIndex={state.currentQuestionIndex}
        totalCards={state.quizQuestions.length}
        masteryGain={state.newMastery}
        initialMastery={state.initialMastery}
        isSaving={state.isSaving}
      />

      <div className="mt-4 md:mt-8 grid grid-cols-1 gap-6">
        <div className="w-full mx-auto">
          <QuestionCard
            currentCard={{
              id: state.currentQuestion?.id || "",
              question: state.currentQuestion?.question || "",
              answer: state.currentQuestion?.answer || "",
            }}
            currentCardIndex={state.currentQuestionIndex}
            totalCards={state.quizQuestions.length}
            showAnswer={state.showAnswer}
            answeredCards={{
              [state.currentQuestion?.id || ""]:
                state.showAnswer &&
                state.currentQuestion?.options[state.selectedOption || 0] ===
                  state.currentQuestion?.answer,
            }}
            questionTimeLeft={0}
            isTimed={false}
          />
        </div>

        <div className="w-full">
          {!state.showAnswer ? (
            <MultipleChoiceOptions
              options={
                state.currentQuestion?.options.map((option) => ({
                  text: option,
                  isCorrect: option === state.currentQuestion!.answer,
                })) || []
              }
              handleAnswer={actions.handleAnswer}
              showAnswer={state.showAnswer}
            />
          ) : (
            <div className="flex justify-center mt-4">
              <Button
                onClick={actions.handleNext}
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                {state.currentQuestionIndex < state.quizQuestions.length - 1
                  ? "Next Question"
                  : "View Results"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
