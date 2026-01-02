/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId,seatNumber]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_userId_gameId_key";

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_gameId_seatNumber_key" ON "Player"("userId", "gameId", "seatNumber");
