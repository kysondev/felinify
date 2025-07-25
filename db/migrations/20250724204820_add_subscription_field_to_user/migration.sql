-- CreateEnum
CREATE TYPE "SUBSCRIPTION" AS ENUM ('starter', 'pro', 'ultra');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscription" "SUBSCRIPTION" NOT NULL DEFAULT 'starter';
