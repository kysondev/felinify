export function getQuestionsPerRound(numOfRounds: number): number {
  if (numOfRounds === 1) return 10;
  if (numOfRounds === 3) return 8;
  if (numOfRounds === 5) return 5;
  return 8;
}

export function calculateProgress(
  currentRound: number,
  currentCardIndex: number,
  questionsPerRound: number,
  totalQuestions: number
): number {
  if (!totalQuestions) return 0;
  return (
    (((currentRound - 1) * questionsPerRound + currentCardIndex + 1) /
      totalQuestions) *
    100
  );
}

export function getMasteryChangeText(
  correct: number,
  incorrect: number
): string {
  const change = correct - incorrect;
  return change >= 0 ? `+${change}%` : `${change}%`;
}

export function isRoundComplete(
  currentCardIndex: number,
  questionsPerRound: number,
  selectedCardsLength: number
): boolean {
  return (
    currentCardIndex >= questionsPerRound - 1 ||
    currentCardIndex >= selectedCardsLength - 1
  );
}
