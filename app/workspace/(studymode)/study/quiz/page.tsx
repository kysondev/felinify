"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "components/ui/button";
import { ErrorState, StudyLoadingScreen } from "components/study";
import { useStudyLoadingState } from "@study/hooks/use-study-loading-state";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useQuizEngine } from "@study/engines/quiz/use-quiz-engine";
import { AdaptiveQuizSettingsPage } from "components/study/adaptive-quiz-settings-page";
import { MultipleChoiceOptions } from "components/study/multiple-choice-options";
import { QuestionCard } from "components/study/question-card";
import { SessionHeader } from "components/study/session-header";
import { FinalResults } from "components/study/final-results";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  // State for quiz settings
  const [showSettings, setShowSettings] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizReady, setQuizReady] = useState(false);

  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const { state, actions } = useQuizEngine({
    deck,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
    deckId,
    setShowSettings,
    setQuizStarted,
    setQuizReady,
    shouldStart: quizReady,
  });

  // Use the shared loading state hook
  const loadingState = useStudyLoadingState({
    mode: 'quiz',
    isLoading,
    deck,
    isStarted: quizStarted,
    isReady: quizReady && !state.isLoading,
    error: state.error,
    isSaving: state.savingResults,
  });

  if (showSettings && deck && userIdRef.current) {
    return <AdaptiveQuizSettingsPage deck={deck} onStartQuiz={actions.handleStartQuiz} error={state.error} />;
  }

  // Show loading screen
  if (loadingState.shouldShowLoading) {
    return (
      <StudyLoadingScreen
        title={loadingState.loadingTitle}
        message={loadingState.loadingMessage}
        progress={loadingState.loadingProgress}
        isSaving={loadingState.isSaving}
      />
    );
  }

  if (noPermission) {
    return (
      <ErrorState
        title="Access Denied"
        message="You do not have permission to view this deck."
        buttonText="Return to Library"
        buttonAction={actions.goToLibrary}
      />
    );
  }

  if (state.error) {
    return (
      <ErrorState
        title="Cannot Start Adaptive Quiz"
        message={state.error}
        buttonText="Return to Library"
        buttonAction={actions.goToLibrary}
      />
    );
  }

  if (state.quizCompleted) {
    return (
      <FinalResults
        {...state}
        totalCards={state.quizQuestions.length}
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
        totalCards={state.quizQuestions.length}
        {...state}
        {...actions}
      />

      <div className="mt-4 md:mt-8 grid grid-cols-1 gap-6">
        <div className="w-full mx-auto">
          <QuestionCard
            currentCard={{
              id: state.currentQuestion?.id || "",
              question: state.currentQuestion?.question || "",
              answer: state.currentQuestion?.answer || "",
            }}
            currentCardIndex={state.currentIndex}
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
                {state.currentIndex < state.quizQuestions.length - 1
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
