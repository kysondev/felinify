"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";
import { useStudySession } from "@study/hooks/useStudySession";
import { validateQuizAccessTokenAction } from "@ai/actions/quiz-access-token.action";
import { generateAdaptiveQuizAction } from "@ai/actions/generate-quiz.actions";
import { updateChallengeCompletionAction } from "@study/actions/study.action";
import { updateFlashcardPerformanceAction } from "@deck/actions/flashcards.action";

export interface QuizQuestion {
  question: string;
  answer: string;
  options: string[];
  id: string;
}

interface QuizEngineConfig {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
  deckId: string | null;
  token: string | null;
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
  token,
}: QuizEngineConfig) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const [numOfQuestions, setNumOfQuestions] = useState(10);

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
    totalQuestions: numOfQuestions,
    studyMode: "quiz",
  });

  // Initialize quiz: validate token, generate questions, and start session
  useEffect(() => {
    const run = async () => {
      if (!deckId || !token || !userId) {
        return;
      }

      try {
        const validationResult = await validateQuizAccessTokenAction(
          token,
          deckId
        );
        if (!validationResult.success) {
          setError(validationResult.message || "Invalid access token");
          setIsLoading(false);
          return;
        }
        setNumOfQuestions(validationResult.numQuestions || 10);

        const quizResult = await generateAdaptiveQuizAction(
          deckId,
          validationResult.numQuestions || 10
        );
        if (!quizResult.success) {
          setError(quizResult.message || "Failed to generate quiz");
          setIsLoading(false);
          return;
        }

        setQuizQuestions(quizResult.questions || []);
        setIsLoading(false);
        startStudySession();
      } catch (e) {
        console.error(e);
        setError("An error occurred while loading the quiz");
        setIsLoading(false);
      }
    };
    run();
  }, [deckId, token, userId]);

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
      error,
      quizQuestions,
      currentQuestion,
      currentQuestionIndex,
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
      handleAnswer,
      handleNext,
      handleEndSession,
      goToLibrary: () => router.push("/workspace/library"),
    },
  } as const;
}
