/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashcard" DROP COLUMN "imageUrl",
ADD COLUMN     "answerImageUrl" TEXT,
ADD COLUMN     "questionImageUrl" TEXT;
