-- CreateTable
CREATE TABLE "GamesPlayed" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "header_image" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "user_rating" INTEGER NOT NULL,
    "review" TEXT,
    "played_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GamesPlayed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GamesPlayed" ADD CONSTRAINT "GamesPlayed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
