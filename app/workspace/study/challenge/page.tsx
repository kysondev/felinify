"use client";

import { Button } from "components/ui/Button";
import { getDeckById } from "services/deck.service";
import { getUser } from "services/user.service";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Deck } from "db/types/models.types";
import {
  LoadingState,
  ErrorState,
  FinalResults,
  QuestionTimer,
  QuestionCard,
  MultipleChoiceOptions,
  SessionHeader,
} from "components/study";
import { useStudySession } from "hooks/useStudySession";
import { useQuestionTimer } from "hooks/useQuestionTimer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/Card";
import { CheckCircle2, XCircle, Award, Clock } from "lucide-react";
import { formatTime } from "utils/date.utils";
import { Progress } from "components/ui/Progress";

const QUESTION_TIME_LIMIT = 15;

export default function ChallengePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deckId = searchParams.get("deckId");
  const numOfRounds = parseInt(searchParams.get("numOfRounds") || "3");
  if (numOfRounds !== 1 && numOfRounds !== 3 && numOfRounds !== 5) {
    return <ErrorState
      title="Invalid number of rounds"
      message="Please select a valid number of rounds."
      buttonText="Return to Library"
      buttonAction={() => router.push("/workspace/library")}
    />;
  }
  const isTimed = searchParams.get("timed") === "true";

  const [deck, setDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [noPermission, setNoPermission] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredCards, setAnsweredCards] = useState<Record<string, boolean>>({});
  const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [showRoundResults, setShowRoundResults] = useState(false);
  const [roundCorrectAnswers, setRoundCorrectAnswers] = useState(0);
  const [roundIncorrectAnswers, setRoundIncorrectAnswers] = useState(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const userId = useRef<string | null>(null);
  const initialMastery = useRef<number>(0);
  const optionsGenerated = useRef<boolean>(false);

  const getQuestionsPerRound = useCallback(() => {
    if (numOfRounds === 1) return 10;
    if (numOfRounds === 3) return 8;
    if (numOfRounds === 5) return 5;
    return 8;
  }, [numOfRounds]);

  const questionsPerRound = getQuestionsPerRound();
  const totalQuestions = questionsPerRound * numOfRounds;

  const selectCardsForRound = useCallback(() => {
    if (!deck?.flashcards || deck.flashcards.length < 4) return;
    
    const shuffledIndices = [...Array(deck.flashcards.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, questionsPerRound);
    
    setSelectedCards(shuffledIndices);
    setCurrentCardIndex(0);
  }, [deck, questionsPerRound]);

  const getCurrentCard = useCallback(() => {
    if (!deck?.flashcards || selectedCards.length === 0) return null;
    return deck.flashcards[selectedCards[currentCardIndex]];
  }, [deck, selectedCards, currentCardIndex]);

  const handleTimeUp = useCallback(() => {
    if (!deck?.flashcards || showAnswer) return;

    const currentCard = getCurrentCard();
    if (!currentCard) return;

    setIncorrectAnswers((prev) => prev + 1);
    setRoundIncorrectAnswers((prev) => prev + 1);
    setAnsweredCards((prev) => ({ ...prev, [String(currentCard.id)]: false }));

    setShowAnswer(true);
  }, [deck, getCurrentCard, showAnswer]);

  const {
    studyTime,
    isStudying,
    isSaving,
    isLoading: isSavingLoading,
    startStudySession,
    handleEndSession,
    saveSessionWithoutRedirect,
    getNewMastery,
  } = useStudySession({
    deck,
    userId: userId.current,
    initialMastery: initialMastery.current,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    studyMode: 'challenge',
  });

  const {
    questionTimeLeft,
    isQuestionActive,
    startQuestionTimer,
    stopQuestionTimer,
  } = useQuestionTimer({
    timeLimit: QUESTION_TIME_LIMIT,
    isTimed,
    onTimeUp: handleTimeUp,
  });

  const generateOptions = useCallback(() => {
    if (!deck?.flashcards || deck.flashcards.length < 4 || optionsGenerated.current) return;

    const currentCard = getCurrentCard();
    if (!currentCard) return;

    optionsGenerated.current = true;
    
    const otherCards = deck.flashcards.filter(
      (card) => card.id !== currentCard.id
    );

    const wrongAnswers = [...otherCards]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((card) => ({ text: card.question, isCorrect: false }));

    const allOptions = [
      { text: currentCard.question, isCorrect: true },
      ...wrongAnswers,
    ];

    setOptions(allOptions.sort(() => 0.5 - Math.random()));
  }, [deck, getCurrentCard]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (!deck?.flashcards || showAnswer) return;

    const currentCard = getCurrentCard();
    if (!currentCard) return;

    const isCorrect = options[optionIndex].isCorrect;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setRoundCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      setRoundIncorrectAnswers((prev) => prev + 1);
    }

    setAnsweredCards((prev) => ({
      ...prev,
      [String(currentCard.id)]: isCorrect,
    }));

    setShowAnswer(true);
    stopQuestionTimer();
  }, [deck, getCurrentCard, options, showAnswer, stopQuestionTimer]);

  const isRoundComplete = useCallback(() => {
    return currentCardIndex >= questionsPerRound - 1 || currentCardIndex >= selectedCards.length - 1;
  }, [currentCardIndex, questionsPerRound, selectedCards.length]);

  const navigateNext = useCallback(() => {
    if (!deck?.flashcards) return;

    if (isRoundComplete()) {
      if (currentRound < numOfRounds) {
        setShowRoundResults(true);
      } else {
        stopQuestionTimer();
        saveSessionWithoutRedirect();
        setShowFinalScore(true);
      }
      return;
    }

    setCurrentCardIndex((prev) => prev + 1);
    setShowAnswer(false);
    optionsGenerated.current = false;
  }, [deck, isRoundComplete, currentRound, numOfRounds, stopQuestionTimer, saveSessionWithoutRedirect]);

  const startNextRound = useCallback(() => {
    setCurrentRound((prev) => prev + 1);
    setShowRoundResults(false);
    setRoundCorrectAnswers(0);
    setRoundIncorrectAnswers(0);
    setShowAnswer(false);
    optionsGenerated.current = false;
    selectCardsForRound();
  }, [selectCardsForRound]);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) {
        router.push("/workspace/library");
        return;
      }

      try {
        const { data: user } = await getUser();
        if (!user) {
          router.push("/auth/login");
          return;
        }

        userId.current = user.id;
        const deckResponse = await getDeckById(deckId, user.id);

        if (!deckResponse.data) {
          router.push("/workspace/library");
          return;
        }

        if (deckResponse.data.userId !== user.id) {
          setNoPermission(true);
          return;
        }

        setDeck(deckResponse.data as unknown as Deck);
        initialMastery.current = deckResponse.data.progress?.mastery || 0;
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, [deckId, router]);

  useEffect(() => {
    if (deck && !isStudying && !isLoading) {
      startStudySession();
      selectCardsForRound();
    }
  }, [deck, isStudying, isLoading, startStudySession, selectCardsForRound]);

  useEffect(() => {
    if (deck?.flashcards && deck.flashcards.length >= 4 && !showAnswer && selectedCards.length > 0) {
      optionsGenerated.current = false;
      generateOptions();
    }
  }, [deck, currentCardIndex, currentRound, showAnswer, generateOptions, selectedCards]);

  useEffect(() => {
    if (deck?.flashcards && !showAnswer && !isLoading && selectedCards.length > 0) {
      startQuestionTimer();
    }
  }, [deck, showAnswer, isLoading, currentCardIndex, currentRound, startQuestionTimer, selectedCards]);

  useEffect(() => {
    if (showAnswer) {
      stopQuestionTimer();
    }
  }, [showAnswer, stopQuestionTimer]);

  if (isLoading || isSaving || isSavingLoading) {
    return <LoadingState isSaving={isSaving} />;
  }

  if (noPermission) {
    return (
      <ErrorState
        title="Access Denied"
        message="You do not have permission to view this deck."
        buttonText="Return to Library"
        buttonAction={() => router.push("/workspace/library")}
      />
    );
  }

  if (!deck?.flashcards?.length) {
    return (
      <ErrorState
        title="No flashcards found"
        message="This deck doesn't have any flashcards yet."
        buttonText="Add flashcards"
        buttonAction={() => router.push(`/workspace/deck/${deckId}`)}
      />
    );
  }

  if (deck.flashcards.length < 4) {
    return (
      <ErrorState
        title="Not enough flashcards"
        message="Challenge mode requires at least 4 flashcards. Please add more cards to your deck."
        buttonText="Add more flashcards"
        buttonAction={() => router.push(`/workspace/deck/${deckId}`)}
      />
    );
  }

  if (showFinalScore) {
    const masteryChange = correctAnswers - incorrectAnswers;
    const masteryChangeText = masteryChange >= 0 ? `+${masteryChange}%` : `${masteryChange}%`;
    
    return (
      <FinalResults
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        totalQuestions={totalQuestions}
        studyTime={studyTime}
        masteryGained={masteryChange}
        masteryChangeText={masteryChangeText}
        isSaving={isSaving}
      />
    );
  }

  if (showRoundResults) {
    const masteryChange = roundCorrectAnswers - roundIncorrectAnswers;
    const masteryChangeText = masteryChange >= 0 ? `+${masteryChange}%` : `${masteryChange}%`;
    
    return (
      <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Round {currentRound} Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <p className="text-lg font-medium">{roundCorrectAnswers}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <XCircle className="h-12 w-12 text-red-500" />
                </div>
                <p className="text-lg font-medium">{roundIncorrectAnswers}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <p className="text-lg font-medium">{masteryChangeText}</p>
                <p className="text-sm text-muted-foreground">Mastery Change</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-12 w-12 text-blue-500" />
                </div>
                <p className="text-lg font-medium">{formatTime(studyTime)}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-center">
                <span className="font-medium">Round {currentRound} of {numOfRounds} complete. </span>
                <span className="text-muted-foreground">
                  {correctAnswers} correct and {incorrectAnswers} incorrect answers so far.
                </span>
              </p>
              <p className="text-center mt-2 text-sm">
                <span className="text-primary font-medium">
                  Total mastery change: {correctAnswers - incorrectAnswers}%
                </span>
              </p>
            </div>
            
            <Progress
  value={(currentRound / numOfRounds) * 100}
  className="w-full h-2 rounded-full overflow-hidden"
/>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={startNextRound} className="min-w-[200px]">
              Start Round {currentRound + 1}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentCard = getCurrentCard();
  if (!currentCard) {
    return <LoadingState isSaving={false} />;
  }

  const totalProgress = (((currentRound - 1) * questionsPerRound + currentCardIndex + 1) / totalQuestions) * 100;
  const isLastCard = isRoundComplete() && currentRound === numOfRounds;

  return (
    <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
      <SessionHeader
        deck={deck}
        currentRound={currentRound}
        numOfRounds={numOfRounds}
        studyTime={studyTime}
        totalProgress={totalProgress}
        handleEndSession={handleEndSession}
        correctAnswers={correctAnswers}
        currentCardIndex={currentCardIndex}
        totalCards={questionsPerRound}
        masteryGain={getNewMastery()}
        initialMastery={initialMastery.current}
        isSaving={isSaving}
      />

      {isTimed && isQuestionActive && !showAnswer && (
        <QuestionTimer
          questionTimeLeft={questionTimeLeft}
          timeLimit={QUESTION_TIME_LIMIT}
        />
      )}

      <div className="w-full aspect-[4/3] md:aspect-[3/2] max-w-2xl mx-auto mb-6 md:mb-8">
        <QuestionCard
          currentCard={{
            ...currentCard,
            question: currentCard.answer,
            answer: currentCard.question,
          }}
          currentCardIndex={currentCardIndex + 1}
          totalCards={questionsPerRound}
          showAnswer={showAnswer}
          answeredCards={answeredCards}
          questionTimeLeft={questionTimeLeft}
          isTimed={isTimed}
        />
      </div>

      {!showAnswer ? (
        <MultipleChoiceOptions
          options={options}
          handleAnswer={handleAnswer}
          showAnswer={showAnswer}
        />
      ) : (
        <div className="flex justify-center">
          <Button onClick={navigateNext} className="min-w-[200px]">
            {isLastCard ? "View Results" : isRoundComplete() ? "View Round Results" : "Next Card"}
          </Button>
        </div>
      )}
    </div>
  );
}
