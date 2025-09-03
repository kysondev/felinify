import { Deck } from "db/types/models.types";

export type Option = { text: string; isCorrect: boolean };
export type ChallengeView = "question" | "saving" | "finalResults";

export interface ChallengeConfig {
  deck: Deck | null;
  isTimed: boolean;
  deckId: string | null;
  userId: string | null;
  initialMastery: number;
  shouldStart?: boolean;
}

export interface ChallengeState {
  currentCardIndex: number;
  selectedCards: number[];
  correctAnswers: number;
  incorrectAnswers: number;
  answeredCards: Record<string, boolean>;
  showAnswer: boolean;
  options: Option[];
  view: ChallengeView;
}
