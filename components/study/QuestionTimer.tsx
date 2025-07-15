import React from "react";
import { Timer } from "lucide-react";

interface QuestionTimerProps {
  questionTimeLeft: number;
  timeLimit: number;
}

export const QuestionTimer = ({
  questionTimeLeft,
  timeLimit,
}: QuestionTimerProps) => (
  <div className="mb-4 md:mb-6">
    <div className="flex items-center justify-center gap-2 mb-2">
      <Timer
        className={`h-4 w-4 ${
          questionTimeLeft <= 5 ? "text-red-500" : "text-primary"
        }`}
      />
      <span
        className={`text-sm font-medium ${
          questionTimeLeft <= 5 ? "text-red-500" : "text-primary"
        }`}
      >
        {questionTimeLeft}s remaining
      </span>
    </div>
    <div className="w-full h-2 bg-secondary rounded-full">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${
          questionTimeLeft <= 5 ? "bg-red-500" : "bg-primary"
        }`}
        style={{
          width: `${(questionTimeLeft / timeLimit) * 100}%`,
        }}
      />
    </div>
  </div>
); 