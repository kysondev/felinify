import { Deck } from "db/types/models.types";

export type Option = { text: string; isCorrect: boolean };
export type ChallengeView = "question" | "roundResults" | "finalResults";

export interface ChallengeConfig {
  deck: Deck | null;
  numOfRounds: number;
  isTimed: boolean;
  deckId: string | null;
  userId: string | null;
  initialMastery: number;
}

export interface ChallengeState {
  currentCardIndex: number;
  currentRound: number;
  selectedCards: number[];
  correctAnswers: number;
  incorrectAnswers: number;
  roundCorrectAnswers: number;
  roundIncorrectAnswers: number;
  answeredCards: Record<string, boolean>;
  showAnswer: boolean;
  options: Option[];
  view: ChallengeView;
}
