import React from "react";
import { Button } from "components/ui/Button";

interface MultipleChoiceOptionsProps {
  options: { text: string; isCorrect: boolean }[];
  handleAnswer: (index: number) => void;
  showAnswer: boolean;
}

export const MultipleChoiceOptions = ({
  options,
  handleAnswer,
  showAnswer,
}: MultipleChoiceOptionsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {options.map((option, index) => (
      <Button
        key={index}
        onClick={() => handleAnswer(index)}
        variant="outline"
        className="p-4 h-auto text-left justify-start hover:bg-accent/20 transition-colors"
        disabled={showAnswer}
      >
        <span className="mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-sm font-medium">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="line-clamp-2">{option.text}</span>
      </Button>
    ))}
  </div>
); 