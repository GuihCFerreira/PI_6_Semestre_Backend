/*
  Warnings:

  - The `supported_languages` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `full_audio_languages` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publishers` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categories` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `genres` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `screenshots` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operational_systems` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "supported_languages",
ADD COLUMN     "supported_languages" TEXT[],
DROP COLUMN "full_audio_languages",
ADD COLUMN     "full_audio_languages" TEXT[],
DROP COLUMN "publishers",
ADD COLUMN     "publishers" TEXT[],
DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[],
DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[],
DROP COLUMN "screenshots",
ADD COLUMN     "screenshots" TEXT[],
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "operational_systems",
ADD COLUMN     "operational_systems" TEXT[];
