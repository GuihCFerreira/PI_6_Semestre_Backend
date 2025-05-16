/*
  Warnings:

  - The `favorite_games` column on the `Quizzes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quizzes" DROP COLUMN "favorite_games",
ADD COLUMN     "favorite_games" INTEGER[];
