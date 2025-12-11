"use client";
import { useQuery } from "@tanstack/react-query";
import {
  allActorOptions,
  popularActorsOptions,
} from "@/lib/queryOptions/actor.options";

export const useGetActor = (id: string) => {
  return useQuery(allActorOptions(id));
};

export const useGetPopularActors = () => {
  return useQuery(popularActorsOptions());
};
