export const generateDeckId = (): number => {
  const min = 100000000;
  const max = 999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
