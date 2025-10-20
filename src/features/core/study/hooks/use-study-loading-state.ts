import { useState, useEffect } from "react";

interface StudyLoadingConfig {
  mode: 'challenge' | 'flip' | 'quiz';
  isLoading: boolean;
  deck: any;
  isStarted: boolean;
  isReady: boolean;
  error?: string | null;
  isSaving?: boolean;
}

interface StudyLoadingState {
  loadingStage: string;
  loadingProgress: number;
  shouldShowLoading: boolean;
  loadingTitle: string;
  loadingMessage: string;
  isSaving: boolean;
}

export function useStudyLoadingState(config: StudyLoadingConfig): StudyLoadingState {
  const [loadingStage, setLoadingStage] = useState<string>("loading-deck");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { mode, isLoading, deck, isStarted, isReady, error, isSaving } = config;

  // Update loading progress based on state
  useEffect(() => {
    if (isSaving) {
      setLoadingStage("saving");
      setLoadingProgress(100);
    } else if (isLoading) {
      setLoadingStage("loading-deck");
      setLoadingProgress(30);
    } else if (deck && !isStarted) {
      setLoadingStage("preparing");
      setLoadingProgress(70);
    } else if (isStarted && !isReady) {
      if (mode === 'quiz') {
        setLoadingStage("generating");
        setLoadingProgress(85);
      } else {
        setLoadingStage("preparing");
        setLoadingProgress(70);
      }
    } else if (isStarted && isReady) {
      setLoadingStage("complete");
      setLoadingProgress(100);
    }
  }, [isLoading, deck, isStarted, isReady, isSaving, mode]);

  // Determine if we should show loading
  const shouldShowLoading = isLoading || (isStarted && !isReady) || !!error || !!isSaving;

  const getLoadingMessages = () => {
    switch (mode) {
      case 'challenge':
        return {
          title: isSaving ? "Saving Your Progress" : "Preparing Your Challenge",
          messages: {
            "loading-deck": "Loading your flashcards...",
            "preparing": "Setting up challenge questions...",
            "complete": "Starting challenge...",
            "saving": "Updating your progress and calculating mastery..."
          }
        };
      case 'quiz':
        return {
          title: isSaving ? "Saving Your Results" : "Preparing Your Quiz",
          messages: {
            "loading-deck": "Loading your flashcards...",
            "preparing": "Checking requirements and energy...",
            "generating": "Creating personalized questions...",
            "complete": "Quiz ready! Starting...",
            "saving": "Updating your progress and calculating mastery..."
          }
        };
      case 'flip':
        return {
          title: isSaving ? "Saving Your Progress" : "Preparing Your Study Session",
          messages: {
            "loading-deck": "Loading your flashcards...",
            "preparing": "Setting up study session...",
            "complete": "Starting study session...",
            "saving": "Updating your progress and calculating mastery..."
          }
        };
      default:
        return {
          title: isSaving ? "Saving Your Progress" : "Preparing Study Session",
          messages: {
            "loading-deck": "Loading...",
            "preparing": "Preparing...",
            "complete": "Starting...",
            "saving": "Updating your progress..."
          }
        };
    }
  };

  const { title, messages } = getLoadingMessages();
  const loadingMessage = messages[loadingStage as keyof typeof messages] || "Loading...";

  return {
    loadingStage,
    loadingProgress,
    shouldShowLoading,
    loadingTitle: title,
    loadingMessage,
    isSaving: !!isSaving,
  };
}
