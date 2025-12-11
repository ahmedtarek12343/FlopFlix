"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { contentType } from "./favorite.action";
import { getUser } from "./user.action";

export const addToHistory = async (content: contentType) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.watchedHistory.upsert({
      where: {
        userId_contentId_type: {
          userId: user.id,
          contentId: content.contentId,
          type: content.type,
        },
      },
      update: {
        type: content.type,
        title: content.title,
        backdrop_path: content.backdrop_path,
        overview: content.overview,
        release_date: content.release_date,
        vote_average: content.vote_average,
        createdAt: new Date(),
        genres: content.genres,
      },
      create: {
        contentId: content.contentId,
        userId: user.id,
        type: content.type,
        title: content.title,
        backdrop_path: content.backdrop_path,
        overview: content.overview,
        release_date: content.release_date,
        vote_average: content.vote_average,
        genres: content.genres,
      },
    });
    revalidatePath("/history");
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to add to history");
  }
};

export const getHistory = async () => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const history = await prisma.watchedHistory.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return history;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to get history");
  }
};

export const deleteHistory = async (contentId: number, type: string) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.watchedHistory.deleteMany({
      where: {
        userId: user.id,
        contentId: contentId,
        type: type,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to delete history");
  }
};
