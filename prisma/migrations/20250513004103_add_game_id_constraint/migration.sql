/*
  Warnings:

  - A unique constraint covering the columns `[game_id]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Games_game_id_key" ON "Games"("game_id");
