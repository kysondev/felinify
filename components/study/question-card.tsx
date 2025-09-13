import React from "react";
import { Card } from "components/ui/card";
import { FlashcardImage } from "components/ui/flashcard-image";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionCardProps {
  currentCard: {
    id: string | any;
    question: string;
    answer: string;
    questionImageUrl?: string | null;
  };
  currentCardIndex: number;
  totalCards: number;
  showAnswer: boolean;
  answeredCards: Record<string, boolean>;
  questionTimeLeft: number;
  isTimed: boolean;
}

/** * The QuestionCard component displays the current question and answer.
 * It shows whether the answer was correct or incorrect based on user interaction.
 */
export const QuestionCard = ({
  currentCard,
  currentCardIndex,
  totalCards,
  showAnswer,
  answeredCards,
  questionTimeLeft,
  isTimed,
}: QuestionCardProps) => (
  <Card className="w-full flex flex-col p-6 md:p-8 shadow-md border-2 border-secondary/30 rounded-xl bg-gradient-to-br from-background to-secondary/10">
    <div className="absolute top-3 md:top-4 right-3 md:right-4 text-xs text-muted-foreground">
      Card {currentCardIndex + 1}/{totalCards}
    </div>

    <div className="flex flex-col min-h-[200px] md:min-h-[250px] justify-center">
      <div className="flex flex-col items-center gap-4 mb-6">
        {currentCard.questionImageUrl && (
          <div className="w-32 h-32">
            <FlashcardImage
              src={currentCard.questionImageUrl}
              alt="Question image"
              className="w-full h-full"
            />
          </div>
        )}
        <div className="text-base sm:text-lg md:text-xl font-medium break-words text-center">
          {currentCard.question}
        </div>
      </div>

      {showAnswer && (
        <div className="mt-4 p-4 border border-dashed border-primary/30 rounded-lg w-full">
          <p className="text-sm font-semibold text-muted-foreground mb-2">
            Correct Answer:
          </p>
          <p className="text-base sm:text-lg break-words font-medium">
            {currentCard.answer}
          </p>

          <div className="mt-4 flex items-center justify-center">
            {answeredCards[String(currentCard.id)] ? (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle className="h-5 w-5" />
                <span>Correct</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-500">
                <XCircle className="h-5 w-5" />
                <span>
                  {isTimed && questionTimeLeft === 0
                    ? "Time's Up!"
                    : "Incorrect"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </Card>
);
