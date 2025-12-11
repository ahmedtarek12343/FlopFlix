/*
  Warnings:

  - You are about to drop the column `movieId` on the `favorite_movies` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `watched_history` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,contentId]` on the table `favorite_movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId,type,algorithm]` on the table `recommendations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId]` on the table `watched_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId]` on the table `watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentId` to the `favorite_movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `favorite_movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentId` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentId` to the `watched_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `watched_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentId` to the `watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WatchListType" AS ENUM ('Movie', 'TV', 'Actor');

-- DropIndex
DROP INDEX "favorite_movies_userId_movieId_key";

-- DropIndex
DROP INDEX "recommendations_userId_movieId_algorithm_key";

-- DropIndex
DROP INDEX "watched_history_userId_movieId_key";

-- DropIndex
DROP INDEX "watchlist_userId_movieId_key";

-- AlterTable
ALTER TABLE "favorite_movies" DROP COLUMN "movieId",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "type" "WatchListType" NOT NULL;

-- AlterTable
ALTER TABLE "recommendations" DROP COLUMN "movieId",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "movieId",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "watched_history" DROP COLUMN "movieId",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "watchlist" DROP COLUMN "movieId",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favorite_movies_userId_contentId_key" ON "favorite_movies"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "recommendations_userId_contentId_type_algorithm_key" ON "recommendations"("userId", "contentId", "type", "algorithm");

-- CreateIndex
CREATE UNIQUE INDEX "watched_history_userId_contentId_key" ON "watched_history"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_contentId_key" ON "watchlist"("userId", "contentId");
