"use client";
import { useQuery } from "@tanstack/react-query";
import {
  tvAggregateCredits,
  tvImages,
  tvOptionsById,
  tvReviews,
  tvSimilar,
} from "@/lib/queryOptions/tv.options";

export const useTvOptionsById = (id: number) => {
  return useQuery(tvOptionsById(id));
};

export const useTvAggregateCredits = (id: number) => {
  return useQuery(tvAggregateCredits(id));
};

export const useTvImages = (id: number) => {
  return useQuery(tvImages(id));
};

export const useTvReviews = (id: number) => {
  return useQuery(tvReviews(id));
};

export const useTvSimilar = (id: number) => {
  return useQuery(tvSimilar(id));
};
