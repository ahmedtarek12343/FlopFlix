/*
  Warnings:

  - You are about to drop the column `poster_path` on the `favorite_movies` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `watched_history` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `watchlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite_movies" DROP COLUMN "poster_path",
ADD COLUMN     "backdrop_path" TEXT;

-- AlterTable
ALTER TABLE "watched_history" DROP COLUMN "poster_path",
ADD COLUMN     "backdrop_path" TEXT;

-- AlterTable
ALTER TABLE "watchlist" DROP COLUMN "poster_path",
ADD COLUMN     "backdrop_path" TEXT;
