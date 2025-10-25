ALTER TABLE "deck" ADD COLUMN     "imageUrl" TEXT;

ALTER TABLE "flashcard" ALTER COLUMN "deckId" SET NOT NULL;

ALTER TABLE "quizAccessToken" ALTER COLUMN "deckId" SET NOT NULL;

ALTER TABLE "review" ALTER COLUMN "deckId" SET NOT NULL;

ALTER TABLE "tag" ALTER COLUMN "deckId" SET NOT NULL;

ALTER TABLE "userDeckProgress" ALTER COLUMN "deckId" SET NOT NULL;

CREATE UNIQUE INDEX "userDeckProgress_userId_deckId_key" ON "userDeckProgress"("userId", "deckId");
