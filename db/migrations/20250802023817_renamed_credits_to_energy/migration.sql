/*
  Warnings:

  - You are about to drop the column `credits` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastCreditRefillAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "credits",
DROP COLUMN "lastCreditRefillAt",
ADD COLUMN     "energy" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "lastEnergyRefillAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
