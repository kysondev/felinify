"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Deck } from "db/types/models.types";
import { useStudySession } from "@study/hooks/useStudySession";

interface FlipEngineConfig {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
}

export function useFlipEngine({ deck, userId, initialMastery }: FlipEngineConfig) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const onPrev = useCallback(() => {
    if (!deck?.flashcards?.length) return;
    const newIndex = currentCardIndex === 0 ? totalCards - 1 : currentCardIndex - 1;
    setIsFlipped(false);
    setCurrentCardIndex(newIndex);
  }, [deck, currentCardIndex, totalCards]);

  const onNext = useCallback(() => {
    if (!deck?.flashcards?.length) return;
    const newIndex = currentCardIndex === totalCards - 1 ? 0 : currentCardIndex + 1;
    setIsFlipped(false);
    setCurrentCardIndex(newIndex);
  }, [deck, currentCardIndex, totalCards]);

  const onFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
    if (deck && totalCards > 0) {
      startStudySession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, totalCards]);

  const totalProgress = useMemo(() => {
    if (totalCards === 0) return 0;
    return ((currentCardIndex + 1) / totalCards) * 100;
  }, [currentCardIndex, totalCards]);

  return {
    state: {
      currentCard,
      currentCardIndex,
      totalCards,
      isFlipped,
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

