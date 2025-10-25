ALTER TABLE "deck" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "flashcard" ADD COLUMN "new_deck_id" INTEGER;
ALTER TABLE "review" ADD COLUMN "new_deck_id" INTEGER;
ALTER TABLE "tag" ADD COLUMN "new_deck_id" INTEGER;
ALTER TABLE "userDeckProgress" ADD COLUMN "new_deck_id" INTEGER;
ALTER TABLE "studySession" ADD COLUMN "new_deck_id" INTEGER;
ALTER TABLE "quizAccessToken" ADD COLUMN "new_deck_id" INTEGER;

UPDATE "flashcard" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "flashcard"."deckId" = d."id";
UPDATE "review" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "review"."deckId" = d."id";
UPDATE "tag" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "tag"."deckId" = d."id";
UPDATE "userDeckProgress" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "userDeckProgress"."deckId" = d."id";
UPDATE "studySession" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "studySession"."deckId" = d."id";
UPDATE "quizAccessToken" SET "new_deck_id" = d."new_id" FROM "deck" d WHERE "quizAccessToken"."deckId" = d."id";

ALTER TABLE "flashcard" DROP CONSTRAINT "flashcard_deckId_fkey";
ALTER TABLE "review" DROP CONSTRAINT "review_deckId_fkey";
ALTER TABLE "tag" DROP CONSTRAINT "tag_deckId_fkey";
ALTER TABLE "userDeckProgress" DROP CONSTRAINT "userDeckProgress_deckId_fkey";
ALTER TABLE "studySession" DROP CONSTRAINT "studySession_deckId_fkey";
ALTER TABLE "quizAccessToken" DROP CONSTRAINT "quizAccessToken_deckId_fkey";

ALTER TABLE "flashcard" DROP COLUMN "deckId";
ALTER TABLE "review" DROP COLUMN "deckId";
ALTER TABLE "tag" DROP COLUMN "deckId";
ALTER TABLE "userDeckProgress" DROP COLUMN "deckId";
ALTER TABLE "studySession" DROP COLUMN "deckId";
ALTER TABLE "quizAccessToken" DROP COLUMN "deckId";

ALTER TABLE "flashcard" RENAME COLUMN "new_deck_id" TO "deckId";
ALTER TABLE "review" RENAME COLUMN "new_deck_id" TO "deckId";
ALTER TABLE "tag" RENAME COLUMN "new_deck_id" TO "deckId";
ALTER TABLE "userDeckProgress" RENAME COLUMN "new_deck_id" TO "deckId";
ALTER TABLE "studySession" RENAME COLUMN "new_deck_id" TO "deckId";
ALTER TABLE "quizAccessToken" RENAME COLUMN "new_deck_id" TO "deckId";

ALTER TABLE "deck" DROP CONSTRAINT "deck_pkey";
ALTER TABLE "deck" DROP COLUMN "id";
ALTER TABLE "deck" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "deck" ADD CONSTRAINT "deck_pkey" PRIMARY KEY ("id");

ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "review" ADD CONSTRAINT "review_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "tag" ADD CONSTRAINT "tag_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "userDeckProgress" ADD CONSTRAINT "userDeckProgress_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "studySession" ADD CONSTRAINT "studySession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quizAccessToken" ADD CONSTRAINT "quizAccessToken_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER SEQUENCE "deck_new_id_seq" RENAME TO "deck_id_seq";
SELECT setval('deck_id_seq', 100000000, false);

