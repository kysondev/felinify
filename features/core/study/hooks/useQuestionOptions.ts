import { useState, useCallback, useRef } from "react";
import { Deck } from "db/types/models.types";
import { Option } from "@study/types/challenge.types";

export function useQuestionOptions(deck: Deck | null) {
  const [options, setOptions] = useState<Option[]>([]);
  const optionsGenerated = useRef(false);

  const generateOptions = useCallback(
    (currentCard: any) => {
      if (!deck?.flashcards || deck.flashcards.length < 4 || !currentCard)
        return;

      optionsGenerated.current = true;

      const otherCards = deck.flashcards.filter(
        (card: any) => card.id !== currentCard.id
      );

      const wrongAnswers = [...otherCards]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((card: any) => ({ text: card.question, isCorrect: false }));

      const allOptions: Option[] = [
        { text: currentCard.question, isCorrect: true },
        ...wrongAnswers,
      ];

      setOptions(allOptions.sort(() => 0.5 - Math.random()));
    },
    [deck]
  );

  const resetOptionsGeneration = useCallback(() => {
    optionsGenerated.current = false;
  }, []);

  return {
    options,
    generateOptions,
    resetOptionsGeneration,
    optionsGenerated: optionsGenerated.current,
  };
}
