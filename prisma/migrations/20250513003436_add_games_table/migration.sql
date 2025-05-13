-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "about_the_game" TEXT NOT NULL,
    "header_image" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "supported_languages" TEXT[],
    "full_audio_languages" TEXT[],
    "publishers" TEXT[],
    "categories" TEXT[],
    "genres" TEXT[],
    "screenshots" TEXT[],
    "tags" TEXT[],
    "operational_systems" TEXT[],

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);
