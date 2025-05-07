-- CreateTable
CREATE TABLE "GameSuggested" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "header_image" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "suggested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSuggested_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameSuggested" ADD CONSTRAINT "GameSuggested_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
