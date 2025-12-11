"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "../actions/favorite.action";
import { toast } from "sonner";
import { contentType } from "../actions/favorite.action";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: contentType) => addToFavorites(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
      toast.success("Movie added to favorites");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add movie to favorites");
    },
  });
};
