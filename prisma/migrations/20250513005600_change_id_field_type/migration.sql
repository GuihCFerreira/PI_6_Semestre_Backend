/*
  Warnings:

  - Changed the type of `game_id` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "game_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Games_game_id_key" ON "Games"("game_id");
