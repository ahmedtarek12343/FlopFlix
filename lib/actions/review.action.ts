"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { getUser } from "./user.action";

interface AddReviewProps {
  movieId: number;
  content: string;
  rating: number;
}

export const addReview = async (data: AddReviewProps) => {
  try {
    const user = await currentUser();
    const existingUser = await getUser();
    if (!existingUser || !user) throw new Error("User not found");
    const existingReview = await prisma.review.findFirst({
      where: {
        movieId: data.movieId,
        userId: existingUser.id,
      },
    });
    if (existingReview) throw new Error("Review already exists");
    const review = await prisma.review.create({
      data: {
        movieId: data.movieId,
        content: data.content,
        rating: data.rating,
        userId: existingUser.id,
      },
    });
    return review;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to add review");
  }
};

export const getReviews = async (movieId: number) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");
    const reviews = await prisma.review.findMany({
      where: {
        movieId,
      },
      include: {
        user: true,
      },
    });
    return reviews.map((review) => ({
      ...review,
      created_at: review.createdAt.toISOString(),
      author: review.user.firstName,
      author_details: {
        name: review.user.firstName,
        username: review.user.firstName + " " + (review.user.lastName || ""),
        avatar_path: review.user.avatar_path,
        rating: review.rating,
      },
    }));
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to get reviews");
  }
};
