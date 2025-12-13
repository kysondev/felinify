"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LoadingState,
  ErrorState,
  FinalResults,
  SessionHeader,
  StudyLoadingScreen,
} from "@components/study";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useStudyLoadingState } from "@study/hooks/use-study-loading-state";
import { useChallengeEngine } from "@study/engines/challenge/use-challenge-engine";
import { QuestionView } from "@components/study/question-view";
import { ChallengeSettingsPage } from "@components/study/challenge-settings-page";

function ChallengePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckIdParam = searchParams.get("deckId");
  const deckId = deckIdParam ? parseInt(deckIdParam, 10) : null;
  const isTimed = searchParams.get("timed") === "true";

  const [showSettings, setShowSettings] = useState(true);
  const [challengeIsTimed, setChallengeIsTimed] = useState(isTimed);
  const [challengeStarted, setChallengeStarted] = useState(false);

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

  const loadingState = useStudyLoadingState({
    mode: 'challenge',
    isLoading,
    deck,
    isStarted: challengeStarted,
    isReady: !!(state && state.currentCard),
    isSaving: state?.view === "saving",
  });

  const handleStartChallenge = (isTimed: boolean) => {
    setChallengeIsTimed(isTimed);
    setShowSettings(false);
    setChallengeStarted(true);
  };

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
        buttonAction={() => router.push("/library")}
      />
    );
  }

  if (!deck?.flashcards?.length) {
    return (
      <ErrorState
        title="No flashcards found"
        message="This deck doesn't have any flashcards yet."
        buttonText="Add flashcards"
        buttonAction={() => router.push(`/decks/edit/${deckId}`)}
      />
    );
  }

  if (deck.flashcards.length < 4) {
    return (
      <ErrorState
        title="Not enough flashcards"
        message="Challenge mode requires at least 4 flashcards. Please add more cards to your deck."
        buttonText="Add more flashcards"
        buttonAction={() => router.push(`/decks/edit/${deckId}`)}
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
          currentIndex={state.currentIndex}
          totalCards={state.totalCards}
          newMastery={state.newMastery}
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
            return (
              <StudyLoadingScreen
                title="Saving Your Progress"
                message="Updating your progress and calculating mastery..."
                progress={100}
                isSaving={true}
              />
            );
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

export default function ChallengePage() {
  return (
    <Suspense fallback={null}>
      <ChallengePageInner />
    </Suspense>
  );
}
