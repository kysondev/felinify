/*
  Warnings:

  - The `lengthInSeconds` column on the `studySession` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "studySession" DROP COLUMN "lengthInSeconds",
ADD COLUMN     "lengthInSeconds" INTEGER;
