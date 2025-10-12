"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";
import { useStudySession } from "@study/hooks/use-study-session";
import { updateChallengeCompletionAction } from "@study/actions/study.action";
import { updateFlashcardPerformanceAction } from "@deck/actions/flashcards.action";
import { hasEnoughEnergy } from "@user/actions/user.action";
import { updateUserEnergy } from "@user/services/user.service";
import { generateAdaptiveQuizAction } from "@ai/actions/generate-quiz.actions";

export interface QuizQuestion {
  question: string;
  answer: string;
  options: string[];
  id: string;
  questionImageUrl?: string | null;
}

interface QuizEngineConfig {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
  deckId: string | null;
  shouldStart?: boolean;
  setShowSettings: (show: boolean) => void;
  setQuizStarted: (started: boolean) => void;
  setQuizReady: (ready: boolean) => void;
}

/**
 * Quiz mode engine that manages the AI generated adaptive quiz experience.
 * Handles token validation, quiz generation, answer tracking, and scoring.
 */
export function useQuizEngine({
  deck,
  userId,
  initialMastery,
  deckId,
  shouldStart = true,
  setShowSettings,
  setQuizStarted,
  setQuizReady,
}: QuizEngineConfig) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [savingResults, setSavingResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<string, boolean>
  >({});
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const {
    studyTime,
    startStudySession,
    stopStudySession,
    handleEndSession,
    getNewMastery,
    isSaving,
    saveSessionWithoutRedirect,
  } = useStudySession({
    deck,
    userId,
    initialMastery,
    correctAnswers,
    incorrectAnswers,
    studyMode: "quiz",
  });

  // Start study session when quiz is ready and should start
  useEffect(() => {
    if (shouldStart && quizQuestions.length > 0 && !isLoading) {
      startStudySession();
    }
  }, [shouldStart, quizQuestions.length, isLoading, startStudySession]);

  const handleStartQuiz = async (numQuestions: number): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    try {

      if (!deck?.flashcards || deck.flashcards.length < 10) {
        const errorMsg = "This deck must have at least 10 flashcards to generate a quiz.";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!deck.progress || deck.progress.mastery < 10) {
        const errorMsg = "You need at least 10% mastery in this deck. Complete Challenge Mode to increase your mastery first.";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!deck.progress || (deck.progress.challengeCompleted || 0) < 3) {
        const errorMsg = "Complete Challenge Mode at least 3 times first to unlock Adaptive Quiz.";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const userHasEnoughEnergy = await hasEnoughEnergy(userId!, 1);
      if (!userHasEnoughEnergy.success) {
        const errorMsg = "You don't have enough energy to generate a quiz. Please refill your energy or upgrade your plan.";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const updatedEnergy = await updateUserEnergy(userId!, userHasEnoughEnergy.energy - 1);
      if (!updatedEnergy.success) {
        const errorMsg = updatedEnergy.message || "Failed to update user energy";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      setShowSettings(false);
      setQuizStarted(true);

      const quizResult = await generateAdaptiveQuizAction(deckId!, numQuestions);
      if (!quizResult.success) {
        const errorMsg = quizResult.message || "Failed to generate quiz. Please try again.";
        setError(errorMsg);
        setShowSettings(true);
        setQuizStarted(false);
        return { success: false, error: errorMsg };
      }

      setQuizQuestions(quizResult.questions || []);
      setQuizReady(true);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "An error occurred while generating the quiz";
      setError(errorMsg);
      setShowSettings(true);
      setQuizStarted(false);
      return { success: false, error: errorMsg };
    }
  };

  // Process user's answer selection and update the score
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (showAnswer || !currentQuestion) return;
      const isCorrect =
        currentQuestion.options[optionIndex] === currentQuestion.answer;
      setCorrectAnswers((c) => c + (isCorrect ? 1 : 0));
      setIncorrectAnswers((i) => i + (isCorrect ? 0 : 1));
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestion.id]: isCorrect,
      }));
      setShowAnswer(true);
      setSelectedOption(optionIndex);
    },
    [currentQuestion, showAnswer]
  );

  // Move to next question or complete the quiz
  const handleNext = useCallback(() => {
    setShowAnswer(false);
    setSelectedOption(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      return;
    }

    // End quiz
    stopStudySession();
    setSavingResults(true);
    (async () => {
      if (userId && deckId) {
        try {
          await updateChallengeCompletionAction(userId, deckId);
          const flashcardResults = Object.entries(answeredQuestions).map(
            ([flashcardId, isCorrect]) => ({ flashcardId, isCorrect })
          );
          if (flashcardResults.length) {
            await updateFlashcardPerformanceAction(userId, flashcardResults);
          }
          await saveSessionWithoutRedirect();
        } catch (e) {
          setError("Error saving quiz progress");
          console.error(e);
        }
      }
      setSavingResults(false);
      setQuizCompleted(true);
    })();
  }, [
    answeredQuestions,
    currentQuestionIndex,
    deckId,
    quizQuestions.length,
    saveSessionWithoutRedirect,
    stopStudySession,
    userId,
    setError,
  ]);

  // Calculate progress percentage through the quiz
  const totalProgress = useMemo(() => {
    if (quizQuestions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  }, [currentQuestionIndex, quizQuestions.length]);

  // Calculate how much mastery was gained during this session
  const masteryGained = useMemo(
    () => getNewMastery() - initialMastery,
    [getNewMastery, initialMastery]
  );

  // Return consolidated state and actions for the UI components
  return {
    state: {
      isLoading,
      quizQuestions,
      error,
      currentQuestion,
      currentIndex: currentQuestionIndex,
      showAnswer,
      selectedOption,
      correctAnswers,
      incorrectAnswers,
      quizCompleted,
      savingResults,
      totalProgress,
      studyTime,
      isSaving,
      newMastery: getNewMastery(),
      masteryGained,
      initialMastery,
    },
    actions: {
      handleStartQuiz,
      handleAnswer,
      handleNext,
      handleEndSession,
      goToLibrary: () => router.push("/library"),
    },
  } as const;
}
