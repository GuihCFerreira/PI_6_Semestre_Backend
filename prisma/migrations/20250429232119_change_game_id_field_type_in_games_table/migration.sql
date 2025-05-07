/*
  Warnings:

  - Changed the type of `game_id` on the `FavoriteGames` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `game_id` on the `GameSuggested` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteGames" DROP COLUMN "game_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GameSuggested" DROP COLUMN "game_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;
