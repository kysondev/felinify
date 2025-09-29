-- Rename question to term, answer to definition, and questionImageUrl to termImageUrl
ALTER TABLE "flashcard" RENAME COLUMN "question" TO "term";
ALTER TABLE "flashcard" RENAME COLUMN "answer" TO "definition";
ALTER TABLE "flashcard" RENAME COLUMN "questionImageUrl" TO "termImageUrl";
