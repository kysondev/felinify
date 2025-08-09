import { useState, useCallback } from "react";
import { ChallengeState } from "@study/types/challenge.types";

export function useChallengeState() {
  const [state, setState] = useState<ChallengeState>({
    currentCardIndex: 0,
    currentRound: 1,
    selectedCards: [],
    correctAnswers: 0,
    incorrectAnswers: 0,
    roundCorrectAnswers: 0,
    roundIncorrectAnswers: 0,
    answeredCards: {},
    showAnswer: false,
    options: [],
    view: "question",
  });

  const updateState = useCallback((updates: Partial<ChallengeState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean, cardId: string) => {
    setState((prev) => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      incorrectAnswers: prev.incorrectAnswers + (isCorrect ? 0 : 1),
      roundCorrectAnswers: prev.roundCorrectAnswers + (isCorrect ? 1 : 0),
      roundIncorrectAnswers: prev.roundIncorrectAnswers + (isCorrect ? 0 : 1),
      answeredCards: { ...prev.answeredCards, [cardId]: isCorrect },
      showAnswer: true,
    }));
  }, []);

  const nextCard = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentCardIndex: prev.currentCardIndex + 1,
      showAnswer: false,
    }));
  }, []);

  const startNextRound = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      roundCorrectAnswers: 0,
      roundIncorrectAnswers: 0,
      currentCardIndex: 0,
      showAnswer: false,
      view: "question",
    }));
  }, []);

  return {
    state,
    updateState,
    recordAnswer,
    nextCard,
    startNextRound,
  };
}
