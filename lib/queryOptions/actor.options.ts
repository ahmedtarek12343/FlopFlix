import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";

export const genderConverter: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

export const allActorOptions = (id: string) =>
  queryOptions({
    queryKey: ["actors", id],
    queryFn: async () => {
      const res = await tmdb.get(`/person/${id}`, {
        params: {
          append_to_response:
            "movie_credits,tv_credits,combined_credits,images,external_ids,tagged_images",
        },
      });
      const actor = res.data;
      return {
        ...actor,
        gender: genderConverter[actor.gender],
      };
    },
  });

export const popularActorsOptions = () =>
  queryOptions({
    queryKey: ["actors"],
    queryFn: async () => {
      const res = await tmdb.get(`/person/popular`);
      const actors = res.data.results;
      return actors;
    },
  });
