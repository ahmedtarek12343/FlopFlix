"use client";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteHistory } from "../actions/history.action";

export const useRemoveHistory = (
  contentId: number,
  type: "Movie" | "TV" | "Actor"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteHistory(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["history"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
