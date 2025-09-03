"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LoadingState,
  ErrorState,
  FinalResults,
  SessionHeader,
} from "components/study";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useChallengeEngine } from "features/core/study/engines/challenge/use-challenge-engine";
import { QuestionView } from "components/study/question-view";
import { ChallengeSettingsPage } from "components/study/challenge-settings-page";
import { Progress } from "components/ui/progress";
import { Loader2 } from "lucide-react";

export default function ChallengePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckId = searchParams.get("deckId");
  const isTimed = searchParams.get("timed") === "true";

  const [showSettings, setShowSettings] = useState(true);
  const [challengeIsTimed, setChallengeIsTimed] = useState(isTimed);
  const [challengeStarted, setChallengeStarted] = useState(false);

  const [loadingStage, setLoadingStage] = useState<
    "loading-deck" | "preparing-challenge" | "complete"
  >("loading-deck");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const engine = useChallengeEngine({
    deck,
    isTimed: challengeIsTimed,
    deckId,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
    shouldStart: challengeStarted,
  });
  
  const { state, actions } = engine;

  const handleStartChallenge = (isTimed: boolean) => {
    setChallengeIsTimed(isTimed);
    setShowSettings(false);
    setChallengeStarted(true);
  };

  // Manage loading progress
  useEffect(() => {
    if (isLoading) {
      setLoadingStage("loading-deck");
      setLoadingProgress(30);
    } else if (deck && !challengeStarted) {
      setLoadingStage("preparing-challenge");
      setLoadingProgress(70);
    } else if (challengeStarted && state && state.currentCard) {
      setLoadingStage("complete");
      setLoadingProgress(100);
    }
  }, [isLoading, deck, challengeStarted, state]);

  if (isLoading || (challengeStarted && (!state || !state.currentCard))) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />

          <h2 className="text-xl font-medium mb-2">Preparing Your Challenge</h2>

          <div className="w-full mb-3">
            <Progress value={loadingProgress} className="h-1.5" />
          </div>

          <p className="text-sm text-muted-foreground">
            {loadingStage === "loading-deck" && "Loading your flashcards..."}
            {loadingStage === "preparing-challenge" && "Setting up challenge questions..."}
            {loadingStage === "complete" && "Starting challenge..."}
          </p>
          <span className="text-xs text-muted-foreground mt-1">
            This may take a moment, please don't refresh the page.
          </span>
        </div>
      </div>
    );
  }

  if (noPermission) {
    return (
      <ErrorState
        title="Access Denied"
        message="You do not have permission to view this deck."
        buttonText="Return to Library"
        buttonAction={() => router.push("/workspace/library")}
      />
    );
  }

  if (!deck?.flashcards?.length) {
    return (
      <ErrorState
        title="No flashcards found"
        message="This deck doesn't have any flashcards yet."
        buttonText="Add flashcards"
        buttonAction={() => router.push(`/workspace/deck/edit/${deckId}`)}
      />
    );
  }

  if (deck.flashcards.length < 4) {
    return (
      <ErrorState
        title="Not enough flashcards"
        message="Challenge mode requires at least 4 flashcards. Please add more cards to your deck."
        buttonText="Add more flashcards"
        buttonAction={() => router.push(`/workspace/deck/edit/${deckId}`)}
      />
    );
  }

  if (showSettings) {
    return <ChallengeSettingsPage deck={deck} handleStartChallenge={handleStartChallenge} />;
  }

  return (
    <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
      {/* The SessionHeader component displays study time and progress through all flashcards */}
      {state.view !== "finalResults" && state.view !== "saving" && (
        <SessionHeader
          deck={deck}
          studyTime={state.studyTime}
          totalProgress={state.totalProgress}
          handleEndSession={actions.handleEndSession}
          correctAnswers={state.correctAnswers}
          currentCardIndex={state.currentCardIndex}
          totalCards={state.totalCards}
          masteryGain={state.newMastery}
          initialMastery={state.initialMastery}
          isSaving={state.isSaving}
        />
      )}

      {(() => {
        switch (state.view) {
          case "question":
            // The QuestionView component displays the current question card, timer, and options for answering.
            return <QuestionView isTimed={challengeIsTimed} {...state} {...actions} />;
          case "saving":
            // Show saving loading state while saving the progress
            return <LoadingState isSaving={true} />;
          case "finalResults":
            return (
              // The FinalResults component displays the final results after all questions are complete.
              <FinalResults
                {...state}
                masteryGained={state.newMastery - state.initialMastery}
              />
            );
          default:
            return <LoadingState isSaving={false} />;
        }
      })()}
    </div>
  );
}
