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

export type Progress = Selectable<Database["userDeckProgress"]>;
export type NewProgress = Insertable<Database["userDeckProgress"]>;
export type UpdateProgress = Updateable<Database["userDeckProgress"]>;

export type StudySession = Selectable<Database["studySession"]>;
export type NewStudySession = Insertable<Database["studySession"]>;
export type UpdateStudySession = Updateable<Database["studySession"]>;

export type Subscription = Selectable<Database["subscription"]>;
