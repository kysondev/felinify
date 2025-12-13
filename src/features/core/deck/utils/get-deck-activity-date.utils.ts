import { Deck } from "db/types/models.types";

export const getDeckActivityDate = (deck: Deck) =>
  deck.progress?.lastStudied || deck.updatedAt || deck.createdAt;

export default getDeckActivityDate;
