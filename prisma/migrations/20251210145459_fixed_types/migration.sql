/*
  Warnings:

  - You are about to drop the column `first_air_date` on the `favorite_movies` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `favorite_movies` table. All the data in the column will be lost.
  - You are about to drop the column `first_air_date` on the `watched_history` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `watched_history` table. All the data in the column will be lost.
  - You are about to drop the column `first_air_date` on the `watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `watchlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite_movies" DROP COLUMN "first_air_date",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "watched_history" DROP COLUMN "first_air_date",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "watchlist" DROP COLUMN "first_air_date",
DROP COLUMN "name";
