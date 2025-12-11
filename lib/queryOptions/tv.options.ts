import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";
import { TvWithExtras } from "@/types/types";

export const tvOptionsById = (id: number) =>
  queryOptions({
    queryKey: ["tv", id],
    queryFn: async (): Promise<TvWithExtras> => {
      const res = await tmdb.get(`/tv/${id}`, {
        params: {
          append_to_response:
            "images,videos,credits,recommendations,similar,keywords,reviews",
        },
      });

      return res.data;
    },
  });

export const tvGenreOptions = () => {
  return queryOptions({
    queryKey: ["tv-genres"],
    queryFn: async () => {
      const res = await tmdb.get("/genre/tv/list");
      return res.data.genres;
    },
  });
};

export const tvSeasonDetails = (id: number, seasonNumber: number) => {
  return queryOptions({
    queryKey: ["tvSeasonDetails", id, seasonNumber],
    queryFn: async () => {
      const res = await tmdb.get(`/tv/${id}/season/${seasonNumber}`, {
        params: {
          append_to_response: "images,credits,videos,external_ids,changes",
        },
      });
      return res.data;
    },
  });
};
