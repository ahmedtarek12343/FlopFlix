"use client";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/lib/actions/favorite.action";

export const useGetDbFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(),
  });
};
