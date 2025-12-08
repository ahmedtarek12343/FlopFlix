"use client";
import { useQuery } from "@tanstack/react-query";
import {
  actorOptions,
  actorOptionsCombinedCredits,
} from "@/lib/queryOptions/actor.options";

export const useGetActor = (id: string) => {
  return useQuery(actorOptions(id));
};

export const useGetActorCredits = (id: string) => {
  return useQuery(actorOptionsCombinedCredits(id));
};
