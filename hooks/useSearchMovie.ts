"use client";
import { useQuery } from "@tanstack/react-query";
import { multiSearchOptions } from "../lib/queryOptions/multi.options";

export const useSearchMovie = (query: string) => {
  return useQuery(multiSearchOptions(query));
};
