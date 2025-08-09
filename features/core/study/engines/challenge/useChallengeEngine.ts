import { useCallback, useEffect, useMemo } from "react";
import { ChallengeConfig } from "@study/types/challenge.types";
import { useChallengeState } from "@study/hooks/useChallengeState";
import { useCardSelection } from "@study/hooks/useCardSelection";
import { useQuestionOptions } from "@study/hooks/useQuestionOptions";
import { useQuestionTimer } from "@study/hooks/useQuestionTimer";
import { useStudySession } from "@study/hooks/useStudySession";
import {
  getQuestionsPerRound,
  calculateProgress,
  getMasteryChangeText,
  isRoundComplete,
} from "@study/utils/challenge.utils";
import {
  updateChallengeCompletionAction,
  updateFlashcardPerformanceAction,
} from "@deck/actions/deck.action";

export function useChallengeEngine(config: ChallengeConfig) {
  const { deck, numOfRounds, isTimed, deckId, userId, initialMastery } = config;

  const questionsPerRound = useMemo(
    () => getQuestionsPerRound(numOfRounds),
    [numOfRounds]
  );
  const totalQuestions = questionsPerRound * numOfRounds;

  const { state, updateState, recordAnswer, nextCard, startNextRound } =
    useChallengeState();
  const { selectedCards, selectCards, getCurrentCard } = useCardSelection(
    deck,
    questionsPerRound
  );
  const { options, generateOptions, resetOptionsGeneration } =
    useQuestionOptions(deck);

  const currentCard = getCurrentCard(state.currentCardIndex);

  const {
    questionTimeLeft,
    isQuestionActive,
    startQuestionTimer,
    stopQuestionTimer,
  } = useQuestionTimer({
    timeLimit: 15,
    isTimed,
    onTimeUp: () => handleTimeUp(),
  });

  const {
    studyTime,
    isStudying,
    isSaving,
    isLoading: isSavingLoading,
    startStudySession,
    handleEndSession,
    saveSessionWithoutRedirect,
    getNewMastery,
    stopStudySession,
    pauseStudySession,
    resumeStudySession,
  } = useStudySession({
    deck,
    userId,
    initialMastery,
    correctAnswers: state.correctAnswers,
    incorrectAnswers: state.incorrectAnswers,
    totalQuestions,
    studyMode: "challenge",
  });

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (!currentCard || state.showAnswer) return;

      const isCorrect = options[optionIndex].isCorrect;
      recordAnswer(isCorrect, String(currentCard.id));
      stopQuestionTimer();
    },
    [currentCard, state.showAnswer, options, recordAnswer, stopQuestionTimer]
  );

  const handleTimeUp = useCallback(() => {
    if (!currentCard || state.showAnswer) return;
    recordAnswer(false, String(currentCard.id));
  }, [currentCard, state.showAnswer, recordAnswer]);

  const navigateNext = useCallback(async () => {
    if (!deck?.flashcards) return;

    const roundComplete = isRoundComplete(
      state.currentCardIndex,
      questionsPerRound,
      selectedCards.length
    );

    if (roundComplete) {
      if (state.currentRound < numOfRounds) {
        pauseStudySession();
        updateState({ view: "roundResults" });
      } else {
        stopQuestionTimer();
        stopStudySession();
        // Save final results
        if (userId && deckId) {
          try {
            await updateChallengeCompletionAction(userId, deckId);
            const flashcardResults = Object.entries(state.answeredCards).map(
              ([flashcardId, isCorrect]) => ({ flashcardId, isCorrect })
            );
            if (flashcardResults.length) {
              await updateFlashcardPerformanceAction(userId, flashcardResults);
            }
            await saveSessionWithoutRedirect();
          } catch (e) {
            console.error(e);
          }
        }
        updateState({ view: "finalResults" });
      }
      return;
    }

    nextCard();
    resetOptionsGeneration();
  }, [
    deck,
    state.currentCardIndex,
    state.currentRound,
    state.answeredCards,
    questionsPerRound,
    selectedCards.length,
    numOfRounds,
    userId,
    deckId,
    pauseStudySession,
    stopQuestionTimer,
    updateState,
    nextCard,
    resetOptionsGeneration,
    saveSessionWithoutRedirect,
  ]);

  const handleStartNextRound = useCallback(() => {
    resumeStudySession();
    startNextRound();
    selectCards();
    resetOptionsGeneration();
  }, [resumeStudySession, startNextRound, selectCards, resetOptionsGeneration]);

  useEffect(() => {
    if (
      deck &&
      !isStudying &&
      !isSavingLoading &&
      state.view !== "finalResults"
    ) {
      startStudySession();
      selectCards();
    }
  }, [deck, isStudying, isSavingLoading, state.view]);

  useEffect(() => {
    if (currentCard && !state.showAnswer && selectedCards.length > 0) {
      generateOptions(currentCard);
    }
  }, [currentCard, state.showAnswer, selectedCards.length, generateOptions]);

  useEffect(() => {
    if (currentCard && !state.showAnswer) {
      startQuestionTimer();
    }
  }, [currentCard, state.showAnswer, startQuestionTimer]);

  const totalProgress = calculateProgress(
    state.currentRound,
    state.currentCardIndex,
    questionsPerRound,
    totalQuestions
  );

  const roundComplete = isRoundComplete(
    state.currentCardIndex,
    questionsPerRound,
    selectedCards.length
  );
  const isLastCard = roundComplete && state.currentRound === numOfRounds;

  return {
    state: {
      ...state,
      currentCard,
      options,
      selectedCards,
      questionsPerRound,
      totalQuestions,
      numOfRounds,
      totalProgress,
      isRoundComplete: roundComplete,
      isLastCard,
      masteryChangeText: getMasteryChangeText(
        state.correctAnswers,
        state.incorrectAnswers
      ),
      roundMasteryChangeText: getMasteryChangeText(
        state.roundCorrectAnswers,
        state.roundIncorrectAnswers
      ),
      questionTimeLeft,
      isQuestionActive,
      timeLimit: 15,
      studyTime,
      isSaving: isSaving || isSavingLoading,
      newMastery: getNewMastery(),
      initialMastery,
    },
    actions: {
      handleAnswer,
      navigateNext,
      startNextRound: handleStartNextRound,
      handleEndSession,
    },
  };
}
