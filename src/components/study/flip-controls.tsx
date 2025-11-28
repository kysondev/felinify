"use client";

import { Button } from "@ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Shuffle,
  Volume2,
} from "lucide-react";

interface FlipControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

/** * FlipControls provides navigation plus AI hint and speak buttons */
export function FlipControls({ onPrev, onNext, onShuffle }: FlipControlsProps) {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center md:hidden gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={onPrev}
            className="w-10 h-10 p-0 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={onShuffle}
            variant="outline"
            className="w-10 h-10 p-0 rounded-full"
            title="Shuffle cards"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 px-3 py-2 rounded-full border-dashed border-primary/50 text-primary bg-background"
            title="AI hint (coming soon)"
            onClick={() => {}}
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">AI Hint</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 px-3 py-2 rounded-full border-dashed border-primary/50 text-primary bg-background"
            title="Speak card (coming soon)"
            onClick={() => {}}
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">Speak</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onNext} className="w-10 h-10 p-0 rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
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
          <Button
            onClick={() => {}}
            variant="outline"
            className="flex items-center gap-1 px-4 py-2 rounded-full border-dashed border-primary/50 text-primary bg-background"
            title="AI hint (coming soon)"
          >
            <Lightbulb className="h-4 w-4" />
            AI Hint
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
          <Button
            onClick={() => {}}
            variant="outline"
            className="flex items-center gap-1 px-4 py-2 rounded-full border-dashed border-primary/50 text-primary bg-background"
            title="Speak card (coming soon)"
          >
            <Volume2 className="h-4 w-4" />
            Speak
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
