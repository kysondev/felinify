import { Insertable, Selectable, Updateable } from "kysely";
import { Database } from "./schema.types";

export type User = Selectable<Database["user"]>;
export type NewUser = Insertable<Database["user"]>;
export type UpdateUser = Updateable<Database["user"]>;

export type Deck = Selectable<Database["deck"]>;
export type NewDeck = Insertable<Database["deck"]>;
export type UpdateDeck = Updateable<Database["deck"]>;

export type Flashcard = Selectable<Database["flashcard"]>;
export type NewFlashcard = Insertable<Database["flashcard"]>;
export type UpdateFlashcard = Updateable<Database["flashcard"]>;
