CREATE TEMP TABLE deck_id_mapping (
  old_id INTEGER,
  new_id INTEGER
);

INSERT INTO deck_id_mapping (old_id, new_id)
SELECT 
  id as old_id,
  (100000000 + (random() * 899999999)::INTEGER) as new_id
FROM deck
ORDER BY id;

ALTER TABLE "flashcard" DROP CONSTRAINT "flashcard_deckId_fkey";
ALTER TABLE "review" DROP CONSTRAINT "review_deckId_fkey";
ALTER TABLE "tag" DROP CONSTRAINT "tag_deckId_fkey";
ALTER TABLE "userDeckProgress" DROP CONSTRAINT "userDeckProgress_deckId_fkey";
ALTER TABLE "studySession" DROP CONSTRAINT "studySession_deckId_fkey";
ALTER TABLE "quizAccessToken" DROP CONSTRAINT "quizAccessToken_deckId_fkey";

UPDATE "flashcard" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "flashcard"."deckId" = mapping.old_id;

UPDATE "review" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "review"."deckId" = mapping.old_id;

UPDATE "tag" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "tag"."deckId" = mapping.old_id;

UPDATE "userDeckProgress" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "userDeckProgress"."deckId" = mapping.old_id;

UPDATE "studySession" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "studySession"."deckId" = mapping.old_id;

UPDATE "quizAccessToken" 
SET "deckId" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "quizAccessToken"."deckId" = mapping.old_id;

UPDATE "deck" 
SET "id" = mapping.new_id
FROM deck_id_mapping mapping
WHERE "deck"."id" = mapping.old_id;

ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "review" ADD CONSTRAINT "review_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "tag" ADD CONSTRAINT "tag_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "userDeckProgress" ADD CONSTRAINT "userDeckProgress_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "studySession" ADD CONSTRAINT "studySession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quizAccessToken" ADD CONSTRAINT "quizAccessToken_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "deck" ALTER COLUMN "id" DROP DEFAULT;

DROP SEQUENCE IF EXISTS "deck_id_seq";
