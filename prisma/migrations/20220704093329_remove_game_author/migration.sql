/*
  Warnings:

  - You are about to drop the column `authorId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_authorId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "authorId";
