-- CreateTable
CREATE TABLE "Quizzes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "favorite_games" TEXT[],
    "genres" TEXT[],
    "categories" TEXT[],
    "operational_systems" TEXT[],
    "game_language" TEXT NOT NULL,
    "publishers" TEXT[],
    "game_modes" TEXT[],
    "game_styles" TEXT[],
    "camera_perspective" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id")
);
