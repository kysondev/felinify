"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  LoadingState,
  ErrorState,
  FinalResults,
  SessionHeader,
  RoundResultsCard,
} from "components/study";
import { useDeckLoader } from "@study/hooks/useDeckLoader";
import { useChallengeEngine } from "@study/engines/challenge/useChallengeEngine";
import { QuestionView } from "components/study/QuestionView";

export default function ChallengePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckId = searchParams.get("deckId");
  const numOfRounds = parseInt(searchParams.get("numOfRounds") || "3");
  if (numOfRounds !== 1 && numOfRounds !== 3 && numOfRounds !== 5) {
    return (
      <ErrorState
        title="Invalid number of rounds"
        message="Please select a valid number of rounds."
        buttonText="Return to Library"
        buttonAction={() => router.push("/workspace/library")}
      />
    );
  }
  const isTimed = searchParams.get("timed") === "true";

  // Data loading is handled by useDeckLoader and engine
  const { deck, userIdRef, initialMasteryRef, isLoading, noPermission } =
    useDeckLoader(deckId);

  const engine = useChallengeEngine({
    deck,
    numOfRounds,
    isTimed,
    deckId,
    userId: userIdRef.current,
    initialMastery: initialMasteryRef.current,
  });
  const { state, actions } = engine;

  if (isLoading || state.isSaving) {
    return <LoadingState isSaving={state.isSaving} />;
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
      {/* The SessionHeader component displays the current round, total rounds, study time, and progress. */}
      {state.view !== "finalResults" && (
        <SessionHeader
          deck={deck}
          currentRound={state.currentRound}
          numOfRounds={state.numOfRounds}
          studyTime={state.studyTime}
          totalProgress={state.totalProgress}
          handleEndSession={actions.handleEndSession}
          correctAnswers={state.correctAnswers}
          currentCardIndex={state.currentCardIndex}
          totalCards={state.questionsPerRound}
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
          case "roundResults":
            return (
              // The RoundResultsCard component displays the results of the current round.
              <RoundResultsCard
                {...state}
                onStartNextRound={actions.startNextRound}
              />
            );
          case "finalResults":
            return (
              // The FinalResults component displays the final results after all rounds are complete.
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
