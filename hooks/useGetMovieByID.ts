"use client";

import { movieOptionsById } from "../lib/queryOptions/movie.options";
import { useQuery } from "@tanstack/react-query";

export const useGetMovieByID = (id: number) => {
  return useQuery(movieOptionsById(id));
};
