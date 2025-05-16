/*
  Warnings:

  - Changed the type of `supported_languages` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `full_audio_languages` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `publishers` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categories` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genres` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `screenshots` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tags` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `operational_systems` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "supported_languages",
ADD COLUMN     "supported_languages" JSONB NOT NULL,
DROP COLUMN "full_audio_languages",
ADD COLUMN     "full_audio_languages" JSONB NOT NULL,
DROP COLUMN "publishers",
ADD COLUMN     "publishers" JSONB NOT NULL,
DROP COLUMN "categories",
ADD COLUMN     "categories" JSONB NOT NULL,
DROP COLUMN "genres",
ADD COLUMN     "genres" JSONB NOT NULL,
DROP COLUMN "screenshots",
ADD COLUMN     "screenshots" JSONB NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL,
DROP COLUMN "operational_systems",
ADD COLUMN     "operational_systems" JSONB NOT NULL;
