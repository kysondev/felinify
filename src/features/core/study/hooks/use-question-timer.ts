import { useState, useRef, useEffect, useCallback } from "react";

interface UseQuestionTimerProps {
  timeLimit: number;
  isTimed: boolean;
  onTimeUp: () => void;
  isActive?: boolean;
}

/**
 * Hook for managing a countdown timer for questions in challenge mode.
 * Handles starting, stopping, and tracking the timer state.
 */
export const useQuestionTimer = ({
  timeLimit,
  isTimed,
  onTimeUp,
  isActive: initialIsActive = false,
}: UseQuestionTimerProps) => {
  const [questionTimeLeft, setQuestionTimeLeft] = useState(timeLimit);
  const [isQuestionActive, setIsQuestionActive] = useState(initialIsActive);
  
  const questionInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartTime = useRef<number>(0);
  const timerActive = useRef<boolean>(false);

  // Stop the question timer and clear the interval
  const stopQuestionTimer = useCallback(() => {
    if (questionInterval.current) {
      clearInterval(questionInterval.current);
      questionInterval.current = null;
    }
    timerActive.current = false;
    setIsQuestionActive(false);
  }, []);

  // Start the countdown timer for the current question
  const startQuestionTimer = useCallback(() => {
    if (!isTimed || timerActive.current) return;
    
    // Clear any existing timer
    if (questionInterval.current) {
      clearInterval(questionInterval.current);
      questionInterval.current = null;
    }

    // Initialize timer state
    timerActive.current = true;
    setQuestionTimeLeft(timeLimit);
    setIsQuestionActive(true);
    questionStartTime.current = Date.now();

    // Set up interval to update the countdown every second
    questionInterval.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - questionStartTime.current) / 1000
      );
      const remaining = timeLimit - elapsedSeconds;
      
      if (remaining <= 0) {
        // Time's up - reset timer and call the callback
        setQuestionTimeLeft(0);
        timerActive.current = false;
        if (questionInterval.current) {
          clearInterval(questionInterval.current);
          questionInterval.current = null;
        }
        onTimeUp();
      } else {
        // Update the remaining time
        setQuestionTimeLeft(remaining);
      }
    }, 1000);
  }, [isTimed, onTimeUp, timeLimit]);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (questionInterval.current) {
        clearInterval(questionInterval.current);
        questionInterval.current = null;
      }
    };
  }, []);

  return {
    questionTimeLeft,
    isQuestionActive,
    startQuestionTimer,
    stopQuestionTimer,
  };
}; 