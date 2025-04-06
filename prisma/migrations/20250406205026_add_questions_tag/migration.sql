/*
  Warnings:

  - Added the required column `tag` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionsTag" AS ENUM ('FAVORITE_GAMES', 'GENRES', 'CATEGORIES', 'OPERATIONAL_SYSTEMS', 'GAME_LANGUAGE', 'PUBLISHERS', 'MODE', 'STYLE', 'CAMERA');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "tag" "QuestionsTag" NOT NULL;
