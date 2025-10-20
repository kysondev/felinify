import { useCallback, useEffect } from "react";
import { ChallengeConfig } from "@study/types/challenge.types";
import { useChallengeState } from "@study/hooks/use-challenge-state";
import { useCardSelection } from "@study/hooks/use-card-selection";
import { useQuestionOptions } from "@study/hooks/use-question-options";
import { useQuestionTimer } from "@study/hooks/use-question-timer";
import { useStudySession } from "@study/hooks/use-study-session";
import {
  calculateProgress,
  getMasteryChangeText,
} from "@study/utils/challenge.utils";
import { updateChallengeCompletionAction } from "@study/actions/study.action";
import { updateFlashcardPerformanceAction } from "@deck/actions/flashcards.action";

/**
 * Challenge mode engine that manages the multiple choice quiz experience.
 * Handles questions through all flashcards, timer, scoring, and mastery calculations.
 */
export function useChallengeEngine(config: ChallengeConfig) {
  const { deck, isTimed, deckId, userId, initialMastery, shouldStart = true } = config;

  const totalCards = deck?.flashcards?.length ?? 0;

  const { state, updateState, recordAnswer, nextCard } = useChallengeState();
  const { selectedCards, selectCards, getCurrentCard } = useCardSelection(
    deck
  );
  const { options, generateOptions, resetOptionsGeneration } =
    useQuestionOptions(deck);

  const currentCard = getCurrentCard(state.currentIndex);

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
  } = useStudySession({
    deck,
    userId,
    initialMastery,
    correctAnswers: state.correctAnswers,
    incorrectAnswers: state.incorrectAnswers,
    studyMode: "challenge",
  });

  // Process user's answer selection and update the score
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (!currentCard || state.showAnswer) return;

      const isCorrect = options[optionIndex].isCorrect;
      recordAnswer(isCorrect, String(currentCard.id));
      stopQuestionTimer();
    },
    [currentCard, state.showAnswer, options, recordAnswer, stopQuestionTimer]
  );

  // Handle when the timer runs out - mark answer as incorrect
  const handleTimeUp = useCallback(() => {
    if (!currentCard || state.showAnswer) return;
    recordAnswer(false, String(currentCard.id));
  }, [currentCard, state.showAnswer, recordAnswer]);

  // Move to next question or handle completion logic
  const navigateNext = useCallback(() => {
    if (!deck?.flashcards) return;
    
    // Check if we've completed all cards
    const isSessionComplete = state.currentIndex >= totalCards - 1;

    if (isSessionComplete) {
      updateState({ view: "saving" });
      

      stopQuestionTimer();
      stopStudySession();
      
      // Handle saving and then show final results
      if (userId && deckId) {
        const saveProgress = async () => {
          try {
            await updateChallengeCompletionAction(userId, deckId);
            const flashcardResults = Object.entries(state.answeredCards).map(
              ([flashcardId, isCorrect]) => ({ flashcardId, isCorrect })
            );
            if (flashcardResults.length) {
              await updateFlashcardPerformanceAction(userId, flashcardResults);
            }
            await saveSessionWithoutRedirect();
            
            updateState({ view: "finalResults" });
          } catch (e) {
            console.error('Error saving challenge progress:', e);
            updateState({ view: "finalResults" });
          }
        };

        saveProgress();
      } else {
        updateState({ view: "finalResults" });
      }
      return;
    }

    // Move to next card
    nextCard();
    resetOptionsGeneration();
  }, [
    deck,
    state.currentIndex,
    state.answeredCards,
    totalCards,
    selectedCards.length,
    userId,
    deckId,
    stopQuestionTimer,
    stopStudySession,
    updateState,
    nextCard,
    resetOptionsGeneration,
    saveSessionWithoutRedirect,
  ]);

  // Initialize study session when deck is loaded and shouldStart is true
  useEffect(() => {
    if (
      deck &&
      shouldStart &&
      !isStudying &&
      !isSavingLoading &&
      state.view !== "finalResults" &&
      state.view !== "saving"
    ) {
      startStudySession();
      selectCards();
    }
  }, [
    deck,
    shouldStart,
    isStudying,
    isSavingLoading,
    state.view,
    startStudySession,
    selectCards,
  ]);

  // Generate multiple choice options when a new card is shown
  useEffect(() => {
    if (currentCard && !state.showAnswer && selectedCards.length > 0) {
      generateOptions(currentCard);
    }
  }, [currentCard?.id, state.showAnswer, selectedCards.length, generateOptions]);

  // Start the question timer for each new question
  useEffect(() => {
    if (currentCard && !state.showAnswer) {
      startQuestionTimer();
    }
  }, [currentCard?.id, state.showAnswer, startQuestionTimer]);

  const totalProgress = calculateProgress(
    state.currentIndex,
    totalCards
  );

  // Check if we've completed all cards
  const isSessionComplete = state.currentIndex >= totalCards - 1;
  const isLastCard = isSessionComplete;



  // Return consolidated state and actions for the UI components
  return {
    state: {
      ...state,
      currentCard,
      options,
      selectedCards,
      totalCards,
      totalProgress,
      isSessionComplete,
      isLastCard,
      masteryChangeText: getMasteryChangeText(
        state.correctAnswers,
        state.incorrectAnswers
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
      handleEndSession,
    },
  };
}
