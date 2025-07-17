-- CreateTable
CREATE TABLE "quizAccessToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "numQuestions" INTEGER NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quizAccessToken_token_key" ON "quizAccessToken"("token");

-- AddForeignKey
ALTER TABLE "quizAccessToken" ADD CONSTRAINT "quizAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizAccessToken" ADD CONSTRAINT "quizAccessToken_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
