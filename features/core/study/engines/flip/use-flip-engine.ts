"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const totalCards = deck?.flashcards?.length ?? 0;
  const currentCard = useMemo(() => {
    if (!deck?.flashcards || totalCards === 0) return null;
    return deck.flashcards[currentCardIndex];
  }, [deck, currentCardIndex, totalCards]);

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

  // Start study session when deck is loaded
  useEffect(() => {
    if (deck && totalCards > 0) {
      startStudySession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      handleEndSession,
    },
  } as const;
}
