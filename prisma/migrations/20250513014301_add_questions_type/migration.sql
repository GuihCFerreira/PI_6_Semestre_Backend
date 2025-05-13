/*
  Warnings:

  - Added the required column `min_length` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionsType" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHECKBOX', 'INPUT_CHECKBOX');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "min_length" INTEGER NOT NULL,
ADD COLUMN     "type" "QuestionsType" NOT NULL;
