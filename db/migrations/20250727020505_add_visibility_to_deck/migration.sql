-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "deck" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'public';
