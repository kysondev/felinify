"use client";

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

export default function ChallengePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckId = searchParams.get("deckId");
  const isTimed = searchParams.get("timed") === "true";

  // Data loading is handled by useDeckLoader and engine
  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const engine = useChallengeEngine({
    deck,
    isTimed,
    deckId,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
  });
  const { state, actions } = engine;

  if (isLoading) {
    return <LoadingState isSaving={false} />;
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

  if (!state.currentCard) {
    return <LoadingState isSaving={false} />;
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
            return <QuestionView isTimed={isTimed} {...state} {...actions} />;
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
