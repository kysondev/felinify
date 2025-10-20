export function calculateProgress(
  currentCardIndex: number,
  totalCards: number
): number {
  if (!totalCards) return 0;
  return ((currentCardIndex + 1) / totalCards) * 100;
}

export function getMasteryChangeText(
  correct: number,
  incorrect: number
): string {
  const change = correct - incorrect;
  return change >= 0 ? `+${change}%` : `${change}%`;
}


