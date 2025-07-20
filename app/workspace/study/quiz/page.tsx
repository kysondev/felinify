"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  generateAdaptiveQuizAction,
  validateQuizAccessTokenAction,
} from "actions/ai-study.actions";
import { getDeckById } from "services/deck.service";
import { useStudySession } from "hooks/useStudySession";
import { getUser } from "services/user.service";
import { Button } from "components/ui/Button";
import { MultipleChoiceOptions } from "components/study/MultipleChoiceOptions";
import { QuestionCard } from "components/study/QuestionCard";
import { SessionHeader } from "components/study/SessionHeader";
import { FinalResults } from "components/study/FinalResults";
import { ErrorState } from "components/study/states/ErrorState";
import {
  updateChallengeCompletionAction,
  updateFlashcardPerformanceAction,
} from "actions/deck.action";
import { Progress } from "components/ui/Progress";
import { Loader2 } from "lucide-react";

interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  originalFlashcardId: string;
}

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckId = searchParams.get("deckId");
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deck, setDeck] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [savingResults, setSavingResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<string, boolean>
  >({});

  const [loadingStage, setLoadingStage] = useState<
    "validating-token" | "loading-deck" | "generating-quiz" | "complete"
  >("validating-token");
  const [loadingProgress, setLoadingProgress] = useState(0);

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
    initialMastery: deck?.progress?.mastery || 0,
    correctAnswers,
    incorrectAnswers,
    totalQuestions: numOfQuestions,
    studyMode: "quiz",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResult = await getUser();
        if (!userResult.success || !userResult.data) {
          setError("User not authenticated");
          setIsLoading(false);
          return;
        }
        setUserId(userResult.data.id);
        setLoadingProgress(10);
      } catch (error) {
        console.error("Error getting user:", error);
        setError("Error getting user data");
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      if (!deckId || !token || !userId) {
        setError("Invalid quiz session");
        setIsLoading(false);
        return;
      }

      try {
        setLoadingProgress(20);

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
        setTokenValidated(true);
        setLoadingStage("loading-deck");
        setLoadingProgress(40);
      } catch (error) {
        console.error("Error validating token:", error);
        setError("Error validating access token");
        setIsLoading(false);
      }
    };

    if (!tokenValidated && userId) {
      validateToken();
    }
  }, [deckId, token, tokenValidated, userId]);
  useEffect(() => {
    const loadDeckData = async () => {
      if (!tokenValidated || !deckId || !userId) return;

      try {
        const deckResult = await getDeckById(deckId, userId);
        if (!deckResult.success || !deckResult.data) {
          setError("Deck not found");
          setIsLoading(false);
          return;
        }

        setDeck(deckResult.data);
        setLoadingStage("generating-quiz");
        setLoadingProgress(60);

        const quizResult = await generateAdaptiveQuizAction(
          deckId,
          numOfQuestions
        );

        if (!quizResult.success) {
          setError(quizResult.message || "Failed to generate quiz");
          setIsLoading(false);
          return;
        }

        setLoadingProgress(100);
        setLoadingStage("complete");

        setTimeout(() => {
          setQuizQuestions(quizResult.questions);
          setIsLoading(false);
          startStudySession();
        }, 500);
      } catch (error) {
        console.error("Error loading quiz:", error);
        setError("An error occurred while loading the quiz");
        setIsLoading(false);
      }
    };

    if (tokenValidated) {
      loadDeckData();
    }
  }, [deckId, numOfQuestions, tokenValidated, userId]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (showAnswer) return;

      const isCorrect =
        currentQuestion?.options[optionIndex] ===
        currentQuestion?.correctAnswer;

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }

      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestion?.originalFlashcardId || ""]: isCorrect,
      }));

      setShowAnswer(true);
      setSelectedOption(optionIndex);
    },
    [currentQuestion, showAnswer]
  );

  const handleNextQuestion = useCallback(() => {
    setShowAnswer(false);
    setSelectedOption(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      stopStudySession();

      setSavingResults(true);

      const saveData = async () => {
        if (userId && deckId) {
          try {
            await updateChallengeCompletionAction(userId, deckId);

            const flashcardResults = Object.entries(answeredQuestions).map(
              ([flashcardId, isCorrect]) => ({
                flashcardId,
                isCorrect,
              })
            );

            await updateFlashcardPerformanceAction(userId, flashcardResults);

            await saveSessionWithoutRedirect();

            await new Promise((resolve) => setTimeout(resolve, 800));
          } catch (error) {
            console.error("Error saving session data:", error);
          } finally {
            setSavingResults(false);
            setQuizCompleted(true);
          }
        } else {
          setSavingResults(false);
          setQuizCompleted(true);
        }
      };

      saveData();
    }
  }, [
    currentQuestionIndex,
    quizQuestions.length,
    stopStudySession,
    userId,
    deckId,
    saveSessionWithoutRedirect,
    answeredQuestions,
  ]);

  const handleFinish = useCallback(async (): Promise<void> => {
    router.push("/workspace/library");
  }, [router]);

  const goToLibrary = useCallback(() => {
    router.push("/workspace/library");
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />

          <h2 className="text-xl font-medium mb-2">Preparing Your Quiz</h2>

          <div className="w-full mb-3">
            <Progress value={loadingProgress} className="h-1.5" />
          </div>

          <p className="text-sm text-muted-foreground">
            {loadingStage === "validating-token" && "Loading quiz session..."}
            {loadingStage === "loading-deck" && "Loading your flashcards..."}
            {loadingStage === "generating-quiz" &&
              "Creating personalized questions..."}
            {loadingStage === "complete" && "Starting quiz..."}
          </p>
          <span className="text-xs text-muted-foreground mt-1">
            This may take a moment, please don't refresh the page.
          </span>
        </div>
      </div>
    );
  }

  if (savingResults) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
          </div>

          <h2 className="text-xl font-medium mb-2">Saving Your Results</h2>

          <p className="text-sm text-muted-foreground">
            Updating your progress and calculating mastery...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title={
          error.includes("Invalid access token")
            ? "Unauthorized Access"
            : "Cannot Start Adaptive Quiz"
        }
        message={error}
        buttonText="Return to Library"
        buttonAction={goToLibrary}
      />
    );
  }

  if (quizCompleted) {
    const masteryGained = getNewMastery() - (deck?.progress?.mastery || 0);
    console.log(masteryGained);

    return (
      <FinalResults
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        totalQuestions={quizQuestions.length}
        studyTime={studyTime}
        masteryGained={masteryGained}
        masteryChangeText={`${masteryGained}%`}
        isSaving={false}
        onFinish={handleFinish}
        explanationText={
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            <p>+1% mastery for each correct answer</p>
            <p>-1% mastery for each incorrect answer</p>
          </div>
        }
      />
    );
  }

  const totalProgress =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 min-h-[calc(100vh-80px)] flex flex-col mt-20">
      <SessionHeader
        deck={{
          name: deck?.name || "",
          description: deck?.description,
        }}
        studyTime={studyTime}
        totalProgress={totalProgress}
        handleEndSession={handleEndSession}
        correctAnswers={correctAnswers}
        currentCardIndex={currentQuestionIndex}
        totalCards={quizQuestions.length}
        masteryGain={getNewMastery()}
        initialMastery={deck?.progress?.mastery || 0}
        isSaving={isSaving}
      />

      <div className="mt-4 md:mt-8 grid grid-cols-1 gap-6">
        <div className="w-full mx-auto">
          <QuestionCard
            currentCard={{
              id: currentQuestion?.originalFlashcardId || "",
              question: currentQuestion?.question || "",
              answer: currentQuestion?.correctAnswer || "",
            }}
            currentCardIndex={currentQuestionIndex}
            totalCards={quizQuestions.length}
            showAnswer={showAnswer}
            answeredCards={{
              [currentQuestion?.originalFlashcardId || ""]:
                showAnswer &&
                currentQuestion?.options[selectedOption || 0] ===
                  currentQuestion?.correctAnswer,
            }}
            questionTimeLeft={0}
            isTimed={false}
          />
        </div>

        <div className="w-full">
          {!showAnswer ? (
            <MultipleChoiceOptions
              options={
                currentQuestion?.options.map((option) => ({
                  text: option,
                  isCorrect: option === currentQuestion.correctAnswer,
                })) || []
              }
              handleAnswer={handleAnswer}
              showAnswer={showAnswer}
            />
          ) : (
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleNextQuestion}
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                {currentQuestionIndex < quizQuestions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
