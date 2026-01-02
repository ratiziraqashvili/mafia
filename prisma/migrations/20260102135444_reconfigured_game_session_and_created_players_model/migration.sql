-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('LOBBY', 'STARTING', 'IN_PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('UNKNOWN', 'CIVILIAN', 'SERIAL_KILLER', 'YAKUZA', 'SHOGUN', 'DETECTIVE', 'DOCTOR');

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'LOBBY';

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "role" "PlayerRole" NOT NULL DEFAULT 'UNKNOWN',
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "seatNumber" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_gameId_key" ON "Player"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
