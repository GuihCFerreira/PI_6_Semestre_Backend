-- CreateTable
CREATE TABLE "PlayLaterGames" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "header_image" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayLaterGames_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayLaterGames" ADD CONSTRAINT "PlayLaterGames_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
