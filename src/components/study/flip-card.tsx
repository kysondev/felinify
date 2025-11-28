"use client";

import { Card } from "@ui/card";
import { FlashcardImage } from "@ui/flashcard-image";

interface FlipCardProps {
  question: string;
  answer: string;
  questionImageUrl?: string | null;
  isFlipped: boolean;
  onToggle: () => void;
}

// The FlipCard component displays a card that can be flipped to show either the question or the answer.
export function FlipCard({
  question,
  answer,
  questionImageUrl,
  isFlipped,
  onToggle,
}: FlipCardProps) {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] max-w-full sm:max-w-2xl mx-auto mb-5 md:mb-6 perspective-1000">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 backface-hidden">
          <Card className="relative w-full h-full flex flex-col items-center justify-center p-5 md:p-8 shadow-md hover:shadow-lg transition-transform duration-300 border border-border rounded-2xl cursor-pointer bg-card">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-muted text-foreground px-3 py-1">
                Prompt
              </span>
              <span className="rounded-full bg-muted text-muted-foreground px-3 py-1">
                Tap to flip
              </span>
            </div>
            <div className="absolute top-4 right-4 text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
              Question
            </div>

            <div className="w-full max-w-xl text-center overflow-y-auto max-h-[72%] px-2 py-2 my-auto">
              <div className="flex flex-col items-center gap-4">
                {questionImageUrl && (
                  <div className="w-24 h-24">
                    <FlashcardImage
                      src={questionImageUrl}
                      alt="Question image"
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                )}
                <div className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed break-words text-foreground">
                  {question}
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-center text-muted-foreground/70 text-xs md:text-sm">
              Click, tap, or press space to reveal the answer.
            </div>
          </Card>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Card className="relative w-full h-full flex flex-col items-center justify-center p-5 md:p-8 shadow-md hover:shadow-lg transition-transform duration-300 rounded-2xl cursor-pointer bg-card border border-border">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primary text-primary-foreground px-3 py-1">
                Revealed
              </span>
              <span className="rounded-full bg-muted text-muted-foreground px-3 py-1">
                Tap to flip back
              </span>
            </div>
            <div className="absolute top-4 right-4 text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
              Answer
            </div>

            <div className="w-full max-w-xl text-center overflow-y-auto max-h-[72%] px-2 py-2 my-auto">
              <div className="text-base sm:text-lg md:text-xl leading-relaxed break-words">
                {answer}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-center text-muted-foreground/70 text-xs md:text-sm">
              Double-check reasoning and flip back to test recall.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
