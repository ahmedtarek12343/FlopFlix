"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavorites } from "../actions/favorite.action";
import { toast } from "sonner";

export const useRemoveFavorite = (
  contentId: number,
  type: "Movie" | "TV" | "Actor"
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeFromFavorites(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
      toast.success("Movie removed from favorites");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove movie from favorites");
    },
  });
};
