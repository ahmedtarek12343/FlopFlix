"use client";

import { useQuery } from "@tanstack/react-query";
import { topRatedMovieOptions } from "../lib/queryOptions/movie.options";

export const useGetTopRatedMovies = (pageNum: number) => {
  return useQuery(topRatedMovieOptions(pageNum));
};
