import { useState, useCallback } from "react";
import { Deck } from "db/types/models.types";

/**
 * Hook for selecting and managing flashcards for study sessions.
 * Handles random card selection and retrieval for challenge mode.
 */
export function useCardSelection(deck: Deck | null, questionsPerRound: number) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Randomly select cards for the current round
  const selectCards = useCallback(() => {
    if (!deck?.flashcards || deck.flashcards.length < 4) return;

    const shuffledIndices = [...Array(deck.flashcards.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, questionsPerRound);

    setSelectedCards(shuffledIndices);
  }, [deck, questionsPerRound]);

  // Get the current card based on the index in the selected cards array
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
