import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";

export const genderConverter: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

export const actorOptions = (id: string) =>
  queryOptions({
    queryKey: ["actors", id],
    queryFn: async () => {
      const actorsRes = await tmdb.get(`/person/${id}`);
      const actors = actorsRes.data;
      return {
        ...actors,
        gender: genderConverter[actors.gender],
      };
    },
  });

export const actorOptionsCombinedCredits = (id: string) =>
  queryOptions({
    queryKey: ["actor-credits", id],
    queryFn: async () => {
      const actorRes = await tmdb.get(`/person/${id}/combined_credits`);
      const actor = actorRes.data;
      return actor.cast;
    },
  });
