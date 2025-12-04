"use client";
import { useQuery } from "@tanstack/react-query";
import {
  movieOptions,
  movieOptionsbyPageNum,
} from "../lib/queryOptions/movie.options";

export const useDiscoverMovies = () => {
  return useQuery(movieOptions);
};

export const useDiscoverMoviesByPageNum = (pageNum: number) => {
  return useQuery(movieOptionsbyPageNum(pageNum));
};
