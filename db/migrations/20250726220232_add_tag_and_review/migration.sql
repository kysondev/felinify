-- AlterTable
ALTER TABLE "deck" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "studyCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "studyHour" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
