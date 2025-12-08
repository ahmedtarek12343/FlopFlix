"use client";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/actions/review.action";

export const useGetReviews = (movieId: number) => {
  return useQuery({
    queryKey: ["DBreviews", movieId],
    queryFn: () => getReviews(movieId),
  });
};
