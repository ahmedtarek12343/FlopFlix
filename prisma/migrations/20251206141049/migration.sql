/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `favorite_movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `watched_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `watchlist` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `movieId` on the `favorite_movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `movieId` on the `recommendations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `movieId` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `movieId` on the `watched_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `movieId` on the `watchlist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "favorite_movies" DROP CONSTRAINT "favorite_movies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_movieId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_movieId_fkey";

-- DropForeignKey
ALTER TABLE "watched_history" DROP CONSTRAINT "watched_history_movieId_fkey";

-- DropForeignKey
ALTER TABLE "watchlist" DROP CONSTRAINT "watchlist_movieId_fkey";

-- AlterTable
ALTER TABLE "favorite_movies" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recommendations" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "content" TEXT,
ADD COLUMN     "rating" INTEGER,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "watched_history" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "watchlist" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Movie";

-- CreateIndex
CREATE INDEX "favorite_movies_userId_idx" ON "favorite_movies"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_movies_userId_movieId_key" ON "favorite_movies"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "recommendations_userId_movieId_algorithm_key" ON "recommendations"("userId", "movieId", "algorithm");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");

-- CreateIndex
CREATE INDEX "watched_history_userId_idx" ON "watched_history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "watched_history_userId_movieId_key" ON "watched_history"("userId", "movieId");

-- CreateIndex
CREATE INDEX "watchlist_userId_idx" ON "watchlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_movieId_key" ON "watchlist"("userId", "movieId");
