"use client";
import { useQuery } from "@tanstack/react-query";
import { tvOptionsById } from "@/lib/queryOptions/tv.options";

export const useTvOptionsById = (id: number) => {
  return useQuery(tvOptionsById(id));
};
