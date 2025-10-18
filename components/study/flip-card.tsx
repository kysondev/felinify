"use client";

import { Card } from "components/ui/card";
import { FlashcardImage } from "components/ui/flashcard-image";

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
    <div className="w-full aspect-[4/3] md:aspect-[3/2] max-w-2xl mx-auto mb-6 md:mb-8 perspective-1000">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 backface-hidden">
          <Card className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 shadow-md hover:shadow-lg transition-shadow border-2 border-secondary/30 rounded-xl cursor-pointer bg-gradient-to-br from-background to-secondary/10">
            <div className="absolute top-3 md:top-4 right-3 md:right-4 text-xs text-muted-foreground">
              Question
            </div>
            <div className="w-full max-w-md text-center overflow-y-auto max-h-[70%] px-2 py-2 my-auto">
              <div className="flex flex-col items-center gap-4">
                {questionImageUrl && (
                  <div className="w-24 h-24">
                    <FlashcardImage
                      src={questionImageUrl}
                      alt="Question image"
                      className="w-full h-full"
                    />
                  </div>
                )}
                <div className="text-base sm:text-lg md:text-xl font-medium break-words">
                  {question}
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-muted-foreground/50 text-xs md:text-sm italic">
              Tap to flip
            </div>
          </Card>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Card className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 shadow-md hover:shadow-lg transition-shadow rounded-xl cursor-pointer">
            <div className="absolute top-3 md:top-4 right-3 md:right-4 text-xs text-muted-foreground">
              Answer
            </div>
            <div className="w-full max-w-md text-center overflow-y-auto max-h-[70%] px-2 py-2 my-auto">
              <div className="text-base sm:text-lg md:text-xl break-words">
                {answer}
              </div>
            </div>
            <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-muted-foreground/50 text-xs md:text-sm italic">
              Tap to flip back
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
