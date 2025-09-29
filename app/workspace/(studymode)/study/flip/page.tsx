"use client";

import { useSearchParams } from "next/navigation";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useStudyLoadingState } from "@study/hooks/use-study-loading-state";
import {
  ErrorState,
  SessionHeader,
  StudyLoadingScreen,
} from "components/study";
import NoAccessState from "components/study/states/no-access-state";
import { FlipCard } from "components/study/flip-card";
import { FlipControls } from "components/study/flip-controls";
import { useFlipEngine } from "@study/engines/flip/use-flip-engine";

export default function FlipStudyPage() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const { state, actions } = useFlipEngine({
    deck,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
  });

  // Use the shared loading state hook
  const loadingState = useStudyLoadingState({
    mode: "flip",
    isLoading,
    deck,
    isStarted: !!(deck && state && state.currentCard),
    isReady: !!(state && state.currentCard),
  });

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
    return <NoAccessState />;
  }

  if (!deck?.flashcards?.length || !state.currentCard) {
    return (
      <ErrorState
        title="No Cards Found"
        message="This deck doesn't have any flashcards yet."
        buttonText="Return to Library"
        buttonAction={() => (window.location.href = "/workspace/library")}
      />
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
      <SessionHeader
        deck={{ name: state.deck!.name, description: state.deck!.description }}
        studyTime={state.studyTime}
        totalProgress={state.totalProgress}
        handleEndSession={actions.handleEndSession}
        correctAnswers={0}
        currentIndex={state.currentIndex}
        totalCards={state.totalCards}
        newMastery={state.newMastery}
        initialMastery={state.initialMastery}
        isSaving={state.isSaving}
      />

      <FlipCard
        question={state.currentCard.term}
        answer={state.currentCard.definition}
        questionImageUrl={state.currentCard.termImageUrl}
        isFlipped={state.isFlipped}
        onToggle={actions.onFlip}
      />

      <FlipControls
        onPrev={actions.onPrev}
        onFlip={actions.onFlip}
        onNext={actions.onNext}
      />
    </div>
  );
}
