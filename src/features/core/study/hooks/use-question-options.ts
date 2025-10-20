import { useState, useCallback, useRef } from "react";
import { Deck } from "db/types/models.types";
import { Option } from "@study/types/challenge.types";

/**
 * Hook for generating multiple choice options for challenge mode.
 * Creates a set of options with one correct answer and several distractors.
 */
export function useQuestionOptions(deck: Deck | null) {
  const [options, setOptions] = useState<Option[]>([]);
  const optionsGenerated = useRef(false);
  const currentCardId = useRef<string | null>(null);

  // Generate multiple choice options for the current card
  const generateOptions = useCallback(
    (currentCard: any) => {
      if (!deck?.flashcards || deck.flashcards.length < 4 || !currentCard)
        return;

      // Only generate options once per card
      if (optionsGenerated.current && currentCardId.current === currentCard.id) {
        return;
      }

      optionsGenerated.current = true;
      currentCardId.current = currentCard.id;

      // Get other cards to use as wrong answers
      const otherCards = deck.flashcards.filter(
        (card: any) => card.id !== currentCard.id
      );

      // Select 3 random wrong answers
      const wrongAnswers = [...otherCards]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((card: any) => ({ text: card.question, isCorrect: false }));

      // Combine correct answer with wrong answers
      const allOptions: Option[] = [
        { text: currentCard.question, isCorrect: true },
        ...wrongAnswers,
      ];

      // Shuffle options so correct answer isn't always first
      setOptions(allOptions.sort(() => 0.5 - Math.random()));
    },
    [deck]
  );

  const resetOptionsGeneration = useCallback(() => {
    optionsGenerated.current = false;
    currentCardId.current = null;
  }, []);

  return {
    options,
    generateOptions,
    resetOptionsGeneration,
    optionsGenerated: optionsGenerated.current,
  };
}
