/*
  Warnings:

  - You are about to drop the column `subscription` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "subscription";

-- DropEnum
DROP TYPE "SUBSCRIPTION";
