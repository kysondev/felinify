"use client";

import { useSearchParams } from "next/navigation";
import { useDeckLoader } from "@study/hooks/use-deck-loader";
import { useStudyLoadingState } from "@study/hooks/use-study-loading-state";
import {
  ErrorState,
  SessionHeader,
  StudyLoadingScreen,
} from "@components/study";
import { Progress } from "@ui/progress";
import { Button } from "@ui/button";
import { CheckCircle2, Flag } from "lucide-react";
import { formatTime } from "@common/utils/date.utils";
import NoAccessState from "@components/study/states/no-access-state";
import { FlipCard } from "@components/study/flip-card";
import { FlipControls } from "@components/study/flip-controls";
import { useFlipEngine } from "@study/engines/flip/use-flip-engine";

export default function FlipStudyPage() {
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

  const progressPercent = Math.round(state.totalProgress);
  const cardsLeft = Math.max(state.totalCards - (state.currentIndex + 1), 0);
  const masteryDelta = Math.max(
    Math.round(state.newMastery - state.initialMastery),
    0
  );

  return (
    <div className="min-h-svh bg-background">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10 space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold tracking-wide uppercase text-primary shadow-sm">
              Flip &amp; Learn
            </span>
            <span className="text-sm text-muted-foreground">
              Quick recall, one card at a time.
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Deck:{" "}
            <span className="font-semibold text-foreground">
              {state.deck?.name}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr,1fr] items-stretch">
          <div className="rounded-2xl border border-border bg-card shadow-sm flex flex-col h-full">
            <div className="border-b border-border bg-muted px-4 sm:px-5 py-3.5 sm:py-4 rounded-t-2xl">
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
            </div>

            <div className="px-3 sm:px-5 pb-5 sm:pb-6 pt-4 sm:pt-5 space-y-3 flex flex-col">
              <FlipCard
                key={state.cardKey}
                question={state.currentCard.term}
                answer={state.currentCard.definition}
                questionImageUrl={state.currentCard.termImageUrl}
                isFlipped={state.isFlipped}
                onToggle={actions.onFlip}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="default"
                  className="w-full justify-center rounded-lg shadow-sm"
                  onClick={() => {}}
                  title="Mark as learned (coming soon)"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as learned
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-lg border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                  onClick={() => {}}
                  title="Mark for review (coming soon)"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Need review
                </Button>
              </div>

              <div className="rounded-xl border border-border bg-muted px-3 sm:px-4 py-3 sm:py-3.5 space-y-3">
                <div className="flex items-center justify-between text-sm font-medium text-foreground mb-2">
                  <span>Card controls</span>
                  <span className="text-xs text-muted-foreground">
                    Shuffle when you feel stuck
                  </span>
                </div>
                <FlipControls
                  onPrev={actions.onPrev}
                  onNext={actions.onNext}
                  onShuffle={actions.onShuffle}
                />

              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Session insights
                </p>
                <h3 className="text-lg font-semibold">Stay in rhythm</h3>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                Live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-base font-semibold">
                  {formatTime(state.studyTime)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Card</p>
                <p className="text-base font-semibold">
                  {state.currentIndex + 1} / {state.totalCards}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Left</p>
                <p className="text-base font-semibold">{cardsLeft}</p>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Mastery</p>
                <p className="text-base font-semibold text-primary">
                  +{masteryDelta}%
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Deck progress</span>
                <span className="text-foreground font-semibold">
                  {progressPercent}%
                </span>
              </div>
              <Progress
                value={state.totalProgress}
                className="h-2 rounded-full"
              />
            </div>

            <div className="mt-5 grid gap-3 text-sm flex-1">
              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-inner flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    Focus cues
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Fast
                  </span>
                </div>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>- Say your answer before flipping.</li>
                  <li>- Shuffle if you feel stuck or slow.</li>
                  <li>- AI Hint will appear here soon.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-background px-3 py-3 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    Shortcuts
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Controls
                  </span>
                </div>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>- Click or space to flip the card.</li>
                  <li>- Use the arrows or buttons to move cards.</li>
                  <li>- Shuffle anytime to break patterns.</li>
                  <li>- Get quick hints from Felinify AI.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
