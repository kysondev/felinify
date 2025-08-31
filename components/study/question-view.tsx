import { Button } from "components/ui/button";
import { MultipleChoiceOptions } from "./multiple-choice-options";
import { QuestionCard } from "./question-card";
import { QuestionTimer } from "./question-timer";

interface QuestionViewProps {
  isTimed: boolean;
  isQuestionActive: boolean;
  showAnswer: boolean;
  questionTimeLeft: number;
  timeLimit: number;
  currentCard: any | null;
  currentCardIndex: number;
  questionsPerRound: number;
  answeredCards: Record<string, boolean>;
  options: { text: string; isCorrect: boolean }[];
  handleAnswer: (optionIndex: number) => void;
  navigateNext: () => void;
  isLastCard: boolean;
  isRoundComplete: boolean;
}

/**
 * The QuestionView component displays the current question card, timer, and options for answering.
 * It handles the logic for showing the question, options, and navigating to the next card or showing results.
 */
export const QuestionView = ({
  isTimed,
  isQuestionActive,
  timeLimit,
  currentCard,
  currentCardIndex,
  questionsPerRound,
  showAnswer,
  answeredCards,
  questionTimeLeft,
  options,
  handleAnswer,
  navigateNext,
  isLastCard,
  isRoundComplete,
}: QuestionViewProps) => {
  return (
    <>
      {isTimed && isQuestionActive && !showAnswer && (
        <QuestionTimer
          questionTimeLeft={questionTimeLeft}
          timeLimit={timeLimit}
        />
      )}
      <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8">
        <QuestionCard
          currentCard={{
            ...currentCard,
            question: currentCard!.answer,
            answer: currentCard!.question,
          }}
          currentCardIndex={currentCardIndex + 1}
          totalCards={questionsPerRound}
          showAnswer={showAnswer}
          answeredCards={answeredCards}
          questionTimeLeft={questionTimeLeft}
          isTimed={isTimed}
        />
      </div>
      {!showAnswer ? (
        <MultipleChoiceOptions
          options={options}
          handleAnswer={handleAnswer}
          showAnswer={showAnswer}
        />
      ) : (
        <div className="flex justify-center">
          <Button onClick={navigateNext} className="min-w-[200px]">
            {isLastCard
              ? "View Results"
              : isRoundComplete
                ? "View Round Results"
                : "Next Card"}
          </Button>
        </div>
      )}
    </>
  );
};
