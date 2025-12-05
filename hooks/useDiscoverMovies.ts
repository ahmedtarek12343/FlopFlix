"use client";
import { useQuery } from "@tanstack/react-query";
import {
  movieOptions,
  movieOptionsbyPageNum,
} from "../lib/queryOptions/movie.options";
import { MovieFilters } from "@/store/filters.store";

export const useDiscoverMovies = () => {
  return useQuery(movieOptions);
};

export const useDiscoverMoviesByPageNum = (
  pageNum: number,
  filters: MovieFilters
) => {
  return useQuery(movieOptionsbyPageNum(pageNum, filters));
};
