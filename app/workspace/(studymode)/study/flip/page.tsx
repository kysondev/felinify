"use client";

import { useSearchParams } from "next/navigation";
import { useDeckLoader } from "@study/hooks/useDeckLoader";
import { ErrorState, LoadingState, SessionHeader } from "components/study";
import NoAccessState from "components/study/states/NoAccessState";
import { FlipCard } from "components/study/FlipCard";
import { FlipControls } from "components/study/FlipControls";
import { StudyEndDialog } from "components/study/StudyEndDialog";
import { useFlipEngine } from "@study/engines/flip/useFlipEngine";

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

  if (isLoading || state.isSaving) {
    return <LoadingState isSaving={state.isSaving} />;
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

  const masteryGain = state.newMastery - state.initialMastery;

  return (
    <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
      <div className="flex items-center justify-end mb-4 md:mb-6">
        <StudyEndDialog
          studyTime={state.studyTime}
          onConfirm={actions.handleEndSession}
          isSaving={state.isSaving}
          masteryGainText={
            state.studyTime >= 60 && state.initialMastery <= 50
              ? `You'll gain ${masteryGain}% mastery from this session.`
              : null
          }
          extraDescription={
            state.initialMastery > 50 ||
            (state.newMastery === 50 && state.initialMastery < 50) ? (
              <span className="text-red-500">
                You've reached the maximum 50% mastery allowed in this study
                mode. Study in another mode to progress further.
              </span>
            ) : null
          }
        />
      </div>

      <SessionHeader
        deck={{ name: state.deck!.name, description: state.deck!.description }}
        studyTime={state.studyTime}
        totalProgress={state.totalProgress}
        handleEndSession={actions.handleEndSession}
        correctAnswers={0}
        currentCardIndex={state.currentCardIndex}
        totalCards={state.totalCards}
        masteryGain={state.newMastery}
        initialMastery={state.initialMastery}
        isSaving={state.isSaving}
      />

      <FlipCard
        question={state.currentCard.question}
        answer={state.currentCard.answer}
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
