-- DropForeignKey
ALTER TABLE "deck" DROP CONSTRAINT "deck_userId_fkey";

-- AddForeignKey
ALTER TABLE "deck" ADD CONSTRAINT "deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
