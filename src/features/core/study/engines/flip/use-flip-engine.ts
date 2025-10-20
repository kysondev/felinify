"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Deck } from "db/types/models.types";
import { useStudySession } from "@study/hooks/use-study-session";

interface FlipEngineConfig {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
}

/**
 * Flip mode engine that manages the classic flashcard experience.
 * Handles card navigation, flipping, and mastery calculations.
 */
export function useFlipEngine({
  deck,
  userId,
  initialMastery,
}: FlipEngineConfig) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardKey, setCardKey] = useState(0); // Key to force remount
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const totalCards = deck?.flashcards?.length ?? 0;
  
  // Initialize shuffled indices when deck changes
  useEffect(() => {
    if (deck?.flashcards?.length) {
      const indices = Array.from({ length: deck.flashcards.length }, (_, i) => i);
      setShuffledIndices(indices);
      setCurrentCardIndex(0);
    }
  }, [deck?.flashcards?.length]);

  const currentCard = useMemo(() => {
    if (!deck?.flashcards || totalCards === 0 || shuffledIndices.length === 0) return null;
    const actualIndex = shuffledIndices[currentCardIndex];
    return deck.flashcards[actualIndex];
  }, [deck, currentCardIndex, totalCards, shuffledIndices]);

  const {
    studyTime,
    isSaving,
    startStudySession,
    handleEndSession,
    getNewMastery,
  } = useStudySession({
    deck,
    userId,
    initialMastery,
    studyMode: "flip",
  });

  // Navigate to previous card
  const onPrev = useCallback(() => {
    if (!deck?.flashcards?.length) return;
    const newIndex =
      currentCardIndex === 0 ? totalCards - 1 : currentCardIndex - 1;
    setIsFlipped(false);
    setCurrentCardIndex(newIndex);
    setCardKey(prev => prev + 1); // Force remount to prevent animation
  }, [deck, currentCardIndex, totalCards]);

  // Navigate to next card
  const onNext = useCallback(() => {
    if (!deck?.flashcards?.length) return;
    const newIndex =
      currentCardIndex === totalCards - 1 ? 0 : currentCardIndex + 1;
    setIsFlipped(false);
    setCurrentCardIndex(newIndex);
    setCardKey(prev => prev + 1); // Force remount to prevent animation
  }, [deck, currentCardIndex, totalCards]);

  // Toggle card flip state
  const onFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Shuffle the flashcards order
  const onShuffle = useCallback(() => {
    if (!deck?.flashcards?.length) return;
    
    const newIndices = [...shuffledIndices];
    for (let i = newIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newIndices[i], newIndices[j]] = [newIndices[j], newIndices[i]];
    }
    
    setShuffledIndices(newIndices);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCardKey(prev => prev + 1); // Force remount to prevent animation
  }, [deck, shuffledIndices]);

  // Start study session when deck is loaded
  useEffect(() => {
    if (deck && totalCards > 0) {
      startStudySession();
    }
  }, [deck, totalCards]);

  // Calculate progress percentage through the deck
  const totalProgress = useMemo(() => {
    if (totalCards === 0) return 0;
    return ((currentCardIndex + 1) / totalCards) * 100;
  }, [currentCardIndex, totalCards]);

  // Return consolidated state and actions for the UI components
  return {
    state: {
      currentCard,
      currentIndex: currentCardIndex,
      totalCards,
      isFlipped,
      cardKey,
      studyTime,
      totalProgress,
      isSaving,
      newMastery: getNewMastery(),
      initialMastery,
      deck,
    },
    actions: {
      onPrev,
      onNext,
      onFlip,
      onShuffle,
      handleEndSession,
    },
  } as const;
}
