"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useStudyLoadingState } from "@study/hooks/use-study-loading-state";
import {
  ErrorState,
  SessionHeader,
  StudyLoadingScreen,
} from "@components/study";
import { Progress } from "@ui/progress";
import NoAccessState from "@components/study/states/no-access-state";
import { FlipCard } from "@components/study/flip-card";
import { FlipControls } from "@components/study/flip-controls";
import { useFlipEngine } from "@study/engines/flip/use-flip-engine";

function FlipStudyPageInner() {
  const searchParams = useSearchParams();
  const deckIdParam = searchParams.get("deckId");
  const deckId = deckIdParam ? parseInt(deckIdParam, 10) : null;
  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const { state, actions } = useFlipEngine({
    deck,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
  });

  const { onFlip, onPrev, onNext } = actions;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button, input, textarea, [contenteditable]") ||
        document.querySelector('[role="alertdialog"]')
      ) {
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        onFlip();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFlip, onPrev, onNext]);

  const loadingState = useStudyLoadingState({
    mode: "flip",
    isLoading,
    deck,
    isStarted: !!(deck && state && state.currentCard),
    isReady: !!(state && state.currentCard),
  });

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
        buttonAction={() => (window.location.href = "/library")}
      />
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
        <div className="space-y-3">
          <SessionHeader
            deck={{
              name: state.deck!.name,
              description: state.deck!.description,
            }}
            studyTime={state.studyTime}
            totalProgress={state.totalProgress}
            handleEndSession={actions.handleEndSession}
            correctAnswers={0}
            currentIndex={state.currentIndex}
            totalCards={state.totalCards}
            newMastery={state.newMastery}
            initialMastery={state.initialMastery}
            isSaving={state.isSaving}
            minimal
          />
          <div className="flex items-center gap-3">
            <Progress
              value={state.totalProgress}
              className="h-1.5 flex-1 rounded-full"
            />
            <span className="text-xs tabular-nums text-muted-foreground">
              {state.currentIndex + 1} / {state.totalCards}
            </span>
          </div>
        </div>

        <FlipCard
          key={state.cardKey}
          question={state.currentCard.term}
          answer={state.currentCard.definition}
          questionImageUrl={state.currentCard.termImageUrl}
          isFlipped={state.isFlipped}
          onToggle={actions.onFlip}
        />

        <FlipControls
          onPrev={actions.onPrev}
          onNext={actions.onNext}
          onShuffle={actions.onShuffle}
        />
      </div>
    </div>
  );
}

export default function FlipStudyPage() {
  return (
    <Suspense fallback={null}>
      <FlipStudyPageInner />
    </Suspense>
  );
}
