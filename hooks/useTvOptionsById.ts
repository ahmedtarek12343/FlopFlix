"use client";
import { useQuery } from "@tanstack/react-query";
import { tvOptionsById, tvSeasonDetails } from "@/lib/queryOptions/tv.options";

export const useTvOptionsById = (id: number) => {
  return useQuery(tvOptionsById(id));
};

export const useTvSeasonDetails = (id: number, seasonNumber: number) => {
  return useQuery(tvSeasonDetails(id, seasonNumber));
};
