/*
  Warnings:

  - A unique constraint covering the columns `[gameStackId,userId]` on the table `GameLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roundId,userId]` on the table `GameLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GameLog_gameStackId_roundId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "GameLog_gameStackId_userId_key" ON "GameLog"("gameStackId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameLog_roundId_userId_key" ON "GameLog"("roundId", "userId");
