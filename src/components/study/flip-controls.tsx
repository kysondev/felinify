"use client";

import { Button } from "@ui/button";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

interface FlipControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

/** FlipControls provides previous, shuffle, and next navigation */
export function FlipControls({ onPrev, onNext, onShuffle }: FlipControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        aria-label="Previous card"
        title="Previous (←)"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onShuffle}
        aria-label="Shuffle cards"
        title="Shuffle"
        className="text-muted-foreground"
      >
        <Shuffle />
      </Button>
      <Button
        size="icon"
        onClick={onNext}
        aria-label="Next card"
        title="Next (→)"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
