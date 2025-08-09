import { useState, useRef, useEffect, useCallback } from "react";

interface UseQuestionTimerProps {
  timeLimit: number;
  isTimed: boolean;
  onTimeUp: () => void;
  isActive?: boolean;
}

export const useQuestionTimer = ({
  timeLimit,
  isTimed,
  onTimeUp,
  isActive: initialIsActive = false,
}: UseQuestionTimerProps) => {
  const [questionTimeLeft, setQuestionTimeLeft] = useState(timeLimit);
  const [isQuestionActive, setIsQuestionActive] = useState(initialIsActive);
  
  const questionInterval = useRef<NodeJS.Timeout | null>(null);
  const questionStartTime = useRef<number>(0);
  const timerActive = useRef<boolean>(false);

  const stopQuestionTimer = useCallback(() => {
    if (questionInterval.current) {
      clearInterval(questionInterval.current);
      questionInterval.current = null;
    }
    timerActive.current = false;
    setIsQuestionActive(false);
  }, []);

  const startQuestionTimer = useCallback(() => {
    if (!isTimed || timerActive.current) return;
    
    if (questionInterval.current) {
      clearInterval(questionInterval.current);
      questionInterval.current = null;
    }

    timerActive.current = true;
    setQuestionTimeLeft(timeLimit);
    setIsQuestionActive(true);
    questionStartTime.current = Date.now();

    questionInterval.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - questionStartTime.current) / 1000
      );
      const remaining = timeLimit - elapsedSeconds;
      
      if (remaining <= 0) {
        setQuestionTimeLeft(0);
        timerActive.current = false;
        if (questionInterval.current) {
          clearInterval(questionInterval.current);
          questionInterval.current = null;
        }
        onTimeUp();
      } else {
        setQuestionTimeLeft(remaining);
      }
    }, 1000);
  }, [isTimed, onTimeUp, timeLimit]);

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