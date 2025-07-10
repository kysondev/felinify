import { ColumnType } from "kysely";

export interface UserTable {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  image: string | null;
  role: "user" | "admin";
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
  twoFactorEnabled: boolean | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
}

export interface SessionTable {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
  impersonatedBy: string | null;
}

export interface AccountTable {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export interface VerificationTable {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface TwoFactorTable {
  id: string;
  secret: string;
  backupCodes: string;
  userId: string;
}

export interface DeckTable {
  id: string;
  name: string;
  description: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
  userId: string;
}

export interface UserDeckProgressTable {
  id: string;
  userId: string;
  deckId: string;
  mastery: number;
  completedSessions: number;
  lastStudied: Date | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export interface FlashcardTable {
  id: string;
  question: string;
  answer: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
  deckId: string;
}

export interface FlashcardPerformanceTable {
  id: string;
  userId: string;
  flashcardId: string;
  timesStudied: number;
  correctCount: number;
  incorrectCount: number;
  lastStudied: Date | null;
  easeFactor: number;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export interface StudySessionTable {
  id: string;
  userId: string;
  endedAt: Date | null;
  deckId: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  user: UserTable;
  session: SessionTable;
  account: AccountTable;
  verification: VerificationTable;
  twoFactor: TwoFactorTable;
  deck: DeckTable;
  userDeckProgress: UserDeckProgressTable;
  flashcard: FlashcardTable;
  flashcardPerformance: FlashcardPerformanceTable;
  studySession: StudySessionTable;
}
