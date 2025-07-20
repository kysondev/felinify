import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";
import {
  saveStudyProgressAction,
  saveStudySessionAction,
} from "actions/deck.action";

interface UseStudySessionProps {
  deck: Deck | null;
  userId: string | null;
  initialMastery: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  totalQuestions?: number;
  studyMode?: "challenge" | "flip" | "quiz";
}

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
  const [isPaused, setIsPaused] = useState(false);
  const totalElapsedTime = useRef<number>(0);

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
    if (studyInterval.current) {
      clearInterval(studyInterval.current);
      studyInterval.current = null;
    }

    if (isStudying) {
      totalElapsedTime.current += (Date.now() - studyStartTime.current) / 1000;
    }

    setIsStudying(false);
    setIsPaused(false);
  }, [isStudying]);

  const getNewMastery = useCallback(() => {
    if (studyMode === "challenge" || studyMode === "quiz") {
      if (!deck?.flashcards?.length) return initialMastery;

      const masteryChange = correctAnswers - incorrectAnswers;
      const newMastery = initialMastery + masteryChange;

      return Math.min(Math.max(newMastery, 0), 100);
    } else if (studyMode === "flip") {
      if (initialMastery > 50) {
        return initialMastery;
      }

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
    setIsSaving(true);
    stopStudySession();

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
    } catch (error) {
      console.error("Error saving study progress:", error);
    } finally {
      setIsSaving(false);
    }
  }, [calculateStudyProgress, deck, stopStudySession, studyTime, userId]);

  const handleEndSession = useCallback(async () => {
    setIsSaving(true);
    setIsLoading(true);
    stopStudySession();

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
    } catch (error) {
      console.error("Error saving study progress:", error);
    } finally {
      router.push("/workspace/library");
      setIsSaving(false);
      setIsLoading(false);
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
