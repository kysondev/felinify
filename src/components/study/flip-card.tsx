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
    <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] perspective-1000">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 backface-hidden">
          <Card className="relative w-full h-full flex items-center justify-center p-6 md:p-10 border border-border rounded-2xl cursor-pointer bg-card shadow-sm">
            <span className="absolute top-4 left-5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Question
            </span>
            <div className="w-full max-w-xl text-center overflow-y-auto max-h-full py-6">
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
                <div className="text-lg md:text-2xl font-semibold leading-relaxed break-words text-foreground">
                  {question}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Card className="relative w-full h-full flex items-center justify-center p-6 md:p-10 border border-border rounded-2xl cursor-pointer bg-card shadow-sm">
            <span className="absolute top-4 left-5 text-[11px] uppercase tracking-[0.12em] text-primary">
              Answer
            </span>
            <div className="w-full max-w-xl text-center overflow-y-auto max-h-full py-6">
              <div className="text-base md:text-xl leading-relaxed break-words text-foreground">
                {answer}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
