"use client";
import { tvGenreOptions } from "@/lib/queryOptions/tv.options";
import { useQuery } from "@tanstack/react-query";

export const useTvGenre = () => {
  return useQuery(tvGenreOptions());
};
