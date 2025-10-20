"use client";

import { Button } from "@ui/button";
import { ChevronLeft, ChevronRight, RefreshCw, Shuffle } from "lucide-react";

interface FlipControlsProps {
  onPrev: () => void;
  onFlip: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

/** * The FlipControls component provides navigation controls for flipping through cards.
 * It includes buttons for going to the previous card, flipping the current card, and going to the next card.
 */
export function FlipControls({ onPrev, onFlip, onNext, onShuffle }: FlipControlsProps) {
  return (
    <>
      <div className="flex justify-between items-center md:hidden">
        <Button
          variant="outline"
          onClick={onPrev}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={onFlip}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-2 rounded-full"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Flip
          </Button>
          <Button
            onClick={onShuffle}
            variant="outline"
            className="w-10 h-10 p-0 rounded-full"
            title="Shuffle cards"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onNext} className="w-10 h-10 p-0 rounded-full">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden md:flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center gap-1 px-4 py-2 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-3">
          <Button onClick={onFlip} variant="secondary" className="rounded-full">
            Flip Card
          </Button>
          <Button
            onClick={onShuffle}
            variant="outline"
            className="flex items-center gap-1 px-4 py-2 rounded-full"
            title="Shuffle cards"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>
        </div>
        <Button
          onClick={onNext}
          className="flex items-center gap-1 px-4 py-2 rounded-full"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
