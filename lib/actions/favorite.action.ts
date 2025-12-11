"use server";
import { WatchListType } from "@/app/generated/prisma/enums";
import prisma from "../prisma";
import { getUser } from "./user.action";

export interface contentType {
  contentId: number;
  title?: string | null;
  backdrop_path?: string | null;
  overview?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  name?: string | null;
  first_air_date?: string | null;
  type: WatchListType;
  genres?: string[];
}

export const addToFavorites = async (content: contentType) => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const existingFavorite = await prisma.favorites.findFirst({
      where: {
        contentId: content.contentId,
        userId: user.id,
        type: content.type,
      },
    });

    if (existingFavorite) {
      throw new Error("Movie already in favorites");
    }

    await prisma.favorites.create({
      data: {
        contentId: content.contentId,
        userId: user.id,
        type: content.type,
        title: content.title,
        backdrop_path: content.backdrop_path,
        overview: content.overview,
        release_date: content.release_date,
        vote_average: content.vote_average,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to add to favorites");
  }
};

export const removeFromFavorites = async (
  contentId: number,
  type: "Movie" | "TV" | "Actor"
) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.favorites.deleteMany({
      where: {
        contentId: contentId,
        userId: user.id,
        type: type,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(
      (error as Error).message || "Failed to remove from favorites"
    );
  }
};

export const getFavorites = async () => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const favorites = await prisma.favorites.findMany({
      where: {
        userId: user.id,
      },
    });
    return favorites;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to get favorites");
  }
};
