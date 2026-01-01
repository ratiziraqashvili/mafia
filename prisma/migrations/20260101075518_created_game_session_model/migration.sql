-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('SERIAL_KILLER', 'YAKUZA');

-- CreateEnum
CREATE TYPE "GameVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "gameCode" VARCHAR(6) NOT NULL,
    "sessionName" VARCHAR(30) NOT NULL,
    "mode" "GameMode" NOT NULL,
    "visibility" "GameVisibility" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_gameCode_key" ON "GameSession"("gameCode");
