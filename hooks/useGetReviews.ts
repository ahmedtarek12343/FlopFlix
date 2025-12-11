"use client";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/actions/review.action";

export const useGetReviews = (contentId: number, type: string) => {
  return useQuery({
    queryKey: ["DBreviews", contentId, type],
    queryFn: () => getReviews(contentId, type),
  });
};
