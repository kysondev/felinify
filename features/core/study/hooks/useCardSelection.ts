import { useState, useCallback } from "react";
import { Deck } from "db/types/models.types";

export function useCardSelection(deck: Deck | null, questionsPerRound: number) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const selectCards = useCallback(() => {
    if (!deck?.flashcards || deck.flashcards.length < 4) return;

    const shuffledIndices = [...Array(deck.flashcards.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, questionsPerRound);

    setSelectedCards(shuffledIndices);
  }, [deck, questionsPerRound]);

  const getCurrentCard = useCallback(
    (cardIndex: number) => {
      if (!deck?.flashcards || selectedCards.length === 0) return null;
      return deck.flashcards[selectedCards[cardIndex]];
    },
    [deck, selectedCards]
  );

  return {
    selectedCards,
    selectCards,
    getCurrentCard,
  };
}
