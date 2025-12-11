"use client";
import { getHistory } from "@/lib/actions/history.action";
import { useQuery } from "@tanstack/react-query";

export const useGetHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    staleTime: 0,
  });
};
