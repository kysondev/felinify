-- DropForeignKey
ALTER TABLE "flashcard" DROP CONSTRAINT "flashcard_deckId_fkey";

-- DropForeignKey
ALTER TABLE "flashcardPerformance" DROP CONSTRAINT "flashcardPerformance_flashcardId_fkey";

-- DropForeignKey
ALTER TABLE "flashcardPerformance" DROP CONSTRAINT "flashcardPerformance_userId_fkey";

-- DropForeignKey
ALTER TABLE "studySession" DROP CONSTRAINT "studySession_deckId_fkey";

-- DropForeignKey
ALTER TABLE "studySession" DROP CONSTRAINT "studySession_userId_fkey";

-- DropForeignKey
ALTER TABLE "userDeckProgress" DROP CONSTRAINT "userDeckProgress_deckId_fkey";

-- DropForeignKey
ALTER TABLE "userDeckProgress" DROP CONSTRAINT "userDeckProgress_userId_fkey";

-- AddForeignKey
ALTER TABLE "userDeckProgress" ADD CONSTRAINT "userDeckProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeckProgress" ADD CONSTRAINT "userDeckProgress_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcardPerformance" ADD CONSTRAINT "flashcardPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcardPerformance" ADD CONSTRAINT "flashcardPerformance_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studySession" ADD CONSTRAINT "studySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studySession" ADD CONSTRAINT "studySession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
