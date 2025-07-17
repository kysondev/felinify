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
    {options.map((option, index) => {
      const textLength = option.text.length;
      let heightClass = "min-h-[60px]";
      
      if (textLength > 100) {
        heightClass = "min-h-[120px]";
      } else if (textLength > 50) {
        heightClass = "min-h-[90px]";
      }

      return (
        <Button
          key={index}
          onClick={() => handleAnswer(index)}
          variant="outline"
          className={`p-4 h-auto ${heightClass} text-left justify-start hover:bg-accent/20 transition-colors overflow-hidden whitespace-normal break-words`}
          disabled={showAnswer}
        >
          <span className="mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-sm font-medium flex-shrink-0">
            {String.fromCharCode(65 + index)}
          </span>
          <span className="break-words flex-1">{option.text}</span>
        </Button>
      );
    })}
  </div>
);
