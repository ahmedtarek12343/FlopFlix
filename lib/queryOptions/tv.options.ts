import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";
import { TvWithVideos } from "@/types/types";
import { genderConverter } from "./actor.options";

export const tvOptionsById = (id: number) => {
  return queryOptions({
    queryKey: ["tv", id],
    queryFn: async (): Promise<TvWithVideos> => {
      const [dataRes, videoRes] = await Promise.all([
        tmdb.get(`/tv/${id}`),
        tmdb.get(`/tv/${id}/videos`),
      ]);
      const data = dataRes.data;
      const videos = videoRes.data.results;

      const tv = {
        ...data,
        videos: videos,
      };
      return tv;
    },
  });
};

export const tvGenreOptions = () => {
  return queryOptions({
    queryKey: ["tv-genres"],
    queryFn: async () => {
      const res = await tmdb.get("/genre/tv/list");
      return res.data.genres;
    },
  });
};

export const tvAggregateCredits = (id: number) =>
  queryOptions({
    queryKey: ["tvCredit", id],
    queryFn: async () => {
      const res = await tmdb.get(`/tv/${id}/aggregate_credits`);
      return res.data.cast
        .filter(
          (show: { known_for_department: string }) =>
            show.known_for_department === "Acting"
        )
        .map((show: { gender: number }) => {
          return {
            ...show,
            gender: genderConverter[show.gender],
          };
        })
        .slice(0, 50);
    },
  });

export const tvImages = (id: number) =>
  queryOptions({
    queryKey: ["tvImages", id],
    queryFn: async () => {
      const res = await tmdb.get(`/tv/${id}/images`);
      return res.data.backdrops;
    },
  });

export const tvReviews = (id: number) =>
  queryOptions({
    queryKey: ["tvReviews", id],
    queryFn: async () => {
      const res = await tmdb.get(`/tv/${id}/reviews`);
      return res.data.results;
    },
  });

export const tvSimilar = (id: number) =>
  queryOptions({
    queryKey: ["tvSimilar", id],
    queryFn: async () => {
      const res = await tmdb.get(`/tv/${id}/similar`);
      return res.data.results;
    },
  });
