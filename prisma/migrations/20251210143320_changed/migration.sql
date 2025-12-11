/*
  Warnings:

  - A unique constraint covering the columns `[userId,contentId,type]` on the table `favorite_movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId,type]` on the table `watched_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId,type]` on the table `watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "favorite_movies_userId_contentId_key";

-- DropIndex
DROP INDEX "watched_history_userId_contentId_key";

-- DropIndex
DROP INDEX "watchlist_userId_contentId_key";

-- AlterTable
ALTER TABLE "favorite_movies" ADD COLUMN     "first_air_date" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "release_date" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "vote_average" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "watched_history" ADD COLUMN     "first_air_date" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "release_date" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "vote_average" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "watchlist" ADD COLUMN     "first_air_date" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "release_date" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "vote_average" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "favorite_movies_userId_contentId_type_key" ON "favorite_movies"("userId", "contentId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "watched_history_userId_contentId_type_key" ON "watched_history"("userId", "contentId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_contentId_type_key" ON "watchlist"("userId", "contentId", "type");
