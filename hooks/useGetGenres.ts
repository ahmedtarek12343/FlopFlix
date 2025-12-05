"use client";

import { useQuery } from "@tanstack/react-query";
import { genreOptions } from "@/lib/queryOptions/movie.options";

export const useGetGenres = () => {
  return useQuery(genreOptions());
};
