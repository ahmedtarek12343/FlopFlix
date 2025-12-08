"use client";

import {
  creditsOptions,
  imagesOptions,
  movieOptionsById,
  reviewsOptions,
  similarOptions,
  videoOptions,
} from "../lib/queryOptions/movie.options";
import { useQuery } from "@tanstack/react-query";

export const useGetMovieByID = (id: number) => {
  return useQuery(movieOptionsById(id));
};

export const useGetMovieCreditsByID = (id: number) => {
  return useQuery(creditsOptions(id));
};

export const useGetMovieReviewsByID = (id: number) => {
  return useQuery(reviewsOptions(id));
};

export const useGetMovieSimilarByID = (id: number) => {
  return useQuery(similarOptions(id));
};

export const useGetMovieImagesByID = (id: number) => {
  return useQuery(imagesOptions(id));
};

export const useGetMovieVideosByID = (id: number) => {
  return useQuery(videoOptions(id));
};
