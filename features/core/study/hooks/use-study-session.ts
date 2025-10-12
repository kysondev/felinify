import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";
import {
  saveStudyProgressAction,
  saveStudySessionAction,
} from "@study/actions/study.action";

interface UseStudySessionProps {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  studyMode?: "challenge" | "flip" | "quiz";
}

/**
 * Core hook for managing study sessions across all study modes.
 * Handles timing, progress tracking, mastery calculations, and saving results.
 */
export const useStudySession = ({
  deck,
  userId,
  initialMastery,
  correctAnswers = 0,
  incorrectAnswers = 0,
  studyMode = "challenge",
}: UseStudySessionProps) => {
  const router = useRouter();
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const studyStartTime = useRef<number>(0);
  const studyInterval = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef<boolean>(false);
  const [isPaused, setIsPaused] = useState(false);
  const totalElapsedTime = useRef<number>(0);

  // Start tracking study time with a timer
  const startStudySession = useCallback(() => {
    if (isStudying || isPaused) return;

    studyStartTime.current = Date.now();
    setIsStudying(true);

    studyInterval.current = setInterval(() => {
      const now = Date.now();
      const currentElapsed =
        totalElapsedTime.current + (now - studyStartTime.current) / 1000;
      setStudyTime(Math.floor(currentElapsed));
    }, 1000);
  }, [isStudying, isPaused]);

  // Pause the study timer and save elapsed time
  const pauseStudySession = useCallback(() => {
    if (!isStudying || isPaused) return;

    setIsPaused(true);
    setIsStudying(false);

    if (studyInterval.current) {
      clearInterval(studyInterval.current);
      studyInterval.current = null;
    }

    totalElapsedTime.current += (Date.now() - studyStartTime.current) / 1000;
  }, [isStudying, isPaused]);

  const resumeStudySession = useCallback(() => {
    if (isStudying && studyInterval.current) return;

    if (studyInterval.current) {
      clearInterval(studyInterval.current);
      studyInterval.current = null;
    }

    studyStartTime.current = Date.now();
    setIsStudying(true);
    setIsPaused(false);

    studyInterval.current = setInterval(() => {
      const now = Date.now();
      const currentElapsed =
        totalElapsedTime.current + (now - studyStartTime.current) / 1000;
      setStudyTime(Math.floor(currentElapsed));
    }, 1000);
  }, [isStudying]);

  const stopStudySession = useCallback(() => {
    setIsStudying(false);
    setIsPaused(true);
    if (studyInterval.current) {
      clearInterval(studyInterval.current);
      studyInterval.current = null;
    }

    if (isStudying) {
      totalElapsedTime.current += (Date.now() - studyStartTime.current) / 1000;
    }
  }, [isStudying]);

  // Calculate new mastery level based on study mode and performance
  const getNewMastery = useCallback(() => {
    if (studyMode === "challenge" || studyMode === "quiz") {
      if (!deck?.flashcards?.length) return initialMastery;

      // For challenge/quiz: +1% for each correct, -1% for each incorrect
      const masteryChange = correctAnswers - incorrectAnswers;
      const newMastery = initialMastery + masteryChange;

      return Math.min(Math.max(newMastery, 0), 100);
    } else if (studyMode === "flip") {
      if (initialMastery > 50) {
        // Flip mode can't increase mastery beyond 50%
        return initialMastery;
      }

      // For flip: gain based on study duration, capped at 50% total
      const studyDurationMinutes = studyTime / 60;
      const maxGain = Math.min(Math.floor(studyDurationMinutes), 30);
      const cappedGain =
        initialMastery + maxGain > 50 ? 50 - initialMastery : maxGain;
      return Math.min(initialMastery + cappedGain, 50);
    }

    return initialMastery;
  }, [
    deck?.flashcards?.length,
    initialMastery,
    correctAnswers,
    incorrectAnswers,
    studyMode,
    studyTime,
  ]);

  const calculateStudyProgress = useCallback(() => {
    if (!deck || !userId) return null;

    return {
      userId,
      deckId: String(deck.id),
      mastery: getNewMastery(),
      completedSessions: (deck.progress?.completedSessions || 0) + 1,
      lastStudied: new Date(),
    };
  }, [deck, userId, getNewMastery]);

  const saveSessionWithoutRedirect = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);

    try {
      const progressData = calculateStudyProgress();
      if (progressData) {
        await saveStudyProgressAction(progressData);
        if (deck) {
          await saveStudySessionAction({
            userId: userId as string,
            deckId: String(deck.id),
            lengthInSeconds: studyTime as Number,
          });
        }
      }
      fetch(`/api/revalidate?path=/library`);
      fetch(`/api/revalidate?path=/explore`);
      fetch(`/api/revalidate?path=/decks/${deck?.id}`);
      fetch(`/api/revalidate?path=/deck/edit/${deck?.id}`);
      fetch(`/api/revalidate?path=/study/challenge`);
      fetch(`/api/revalidate?path=/study/flip`);
      fetch(`/api/revalidate?path=/study/quiz`);
    } catch (error) {
      console.error("Error saving study progress:", error);
    } finally {
      router.refresh();
      setIsSaving(false);
      isSavingRef.current = false;
    }
  }, [calculateStudyProgress, deck, stopStudySession, studyTime, userId]);

  const handleEndSession = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    setIsLoading(true);

    try {
      const progressData = calculateStudyProgress();
      if (progressData) {
        await saveStudyProgressAction(progressData);
        if (deck) {
          await saveStudySessionAction({
            userId: userId as string,
            deckId: String(deck.id),
            lengthInSeconds: studyTime as Number,
          });
        }
      }
      fetch(`/api/revalidate?path=/library`);
      fetch(`/api/revalidate?path=/explore`);
      fetch(`/api/revalidate?path=/decks/${deck?.id}`);
      fetch(`/api/revalidate?path=/deck/edit/${deck?.id}`);
      fetch(`/api/revalidate?path=/study/challenge`);
      fetch(`/api/revalidate?path=/study/flip`);
      fetch(`/api/revalidate?path=/study/quiz`);
    } catch (error) {
      console.error("Error saving study progress:", error);
    } finally {
      router.push("/library");
      router.refresh();
      setIsSaving(false);
      setIsLoading(false);
      isSavingRef.current = false;
    }
  }, [
    calculateStudyProgress,
    deck,
    router,
    stopStudySession,
    studyTime,
    userId,
  ]);

  useEffect(() => {
    return () => {
      if (studyInterval.current) {
        clearInterval(studyInterval.current);
        studyInterval.current = null;
      }
    };
  }, []);

  return {
    studyTime,
    isStudying,
    isSaving,
    isLoading,
    startStudySession,
    pauseStudySession,
    resumeStudySession,
    stopStudySession,
    handleEndSession,
    saveSessionWithoutRedirect,
    getNewMastery,
  };
};
