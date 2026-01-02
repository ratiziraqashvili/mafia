/*
  Warnings:

  - Added the required column `hostId` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "hostId" TEXT NOT NULL;
