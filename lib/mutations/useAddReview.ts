"use client";
import { useMutation } from "@tanstack/react-query";
import { addReview } from "../actions/review.action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["DBreviews"],
      });
      toast.success("Review added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
