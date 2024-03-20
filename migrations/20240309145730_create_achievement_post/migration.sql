-- CreateTable
CREATE TABLE "AchievementPost" (
    "id" SERIAL NOT NULL,
    "steam_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "is_idle_game" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL,
    "yarikomi_rating" INTEGER NOT NULL,
    "difficulty_rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "total_hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "AchievementPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementPost_steam_id_key" ON "AchievementPost"("steam_id");
