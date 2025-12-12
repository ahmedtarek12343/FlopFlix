import { useQuery } from "@tanstack/react-query";
import tmdb from "@/lib/tmdb";
import { MovieType, TvWithExtras } from "@/types/types";

export const useFetchContent = (
  recommendations: { query: string; type: "movie" | "tv" }[]
) => {
  return useQuery({
    queryKey: ["ai-recommendations", JSON.stringify(recommendations)],
    queryFn: async () => {
      if (!recommendations.length) return [];

      const results = await Promise.all(
        recommendations.map(async (rec) => {
          try {
            if (rec.type === "movie") {
              const searchRes = await tmdb.get(`/search/movie`, {
                params: { query: rec.query },
              });
              const firstResult = searchRes.data.results[0];
              if (!firstResult) return null;

              const detailRes = await tmdb.get<MovieType>(
                `/movie/${firstResult.id}`
              );
              return { ...detailRes.data, type: "movie" as const };
            } else {
              const searchRes = await tmdb.get(`/search/tv`, {
                params: { query: rec.query },
              });
              const firstResult = searchRes.data.results[0];
              if (!firstResult) return null;

              const detailRes = await tmdb.get<TvWithExtras>(
                `/tv/${firstResult.id}`
              );
              return { ...detailRes.data, type: "tv" as const };
            }
          } catch (error) {
            console.error(`Failed to fetch ${rec.type} ${rec.query}`, error);
            return null;
          }
        })
      );
      return results.filter(
        (
          item
        ): item is
          | (MovieType & { type: "movie" })
          | (TvWithExtras & { type: "tv" }) => item !== null
      );
    },
    enabled: recommendations.length > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
