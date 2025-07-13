/*
  Warnings:

  - You are about to drop the column `endedAt` on the `studySession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studySession" DROP COLUMN "endedAt",
ADD COLUMN     "lengthInSeconds" TEXT;
