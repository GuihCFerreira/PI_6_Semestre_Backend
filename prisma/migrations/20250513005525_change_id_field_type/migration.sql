/*
  Warnings:

  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Games" DROP CONSTRAINT "Games_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "game_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Games_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Games_id_seq";
