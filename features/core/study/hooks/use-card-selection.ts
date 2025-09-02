import { useState, useCallback } from "react";
import { Deck } from "db/types/models.types";

/**
 * Hook for selecting and managing flashcards for study sessions.
 * Handles random card selection and retrieval for challenge mode.
 */
export function useCardSelection(deck: Deck | null, totalCards: number) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Randomly select all cards for the study session
  const selectCards = useCallback(() => {
    if (!deck?.flashcards || deck.flashcards.length < 4) return;

    const shuffledIndices = [...Array(deck.flashcards.length).keys()]
      .sort(() => 0.5 - Math.random());

    setSelectedCards(shuffledIndices);
  }, [deck]);

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
