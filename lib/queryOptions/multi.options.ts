import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";

export const multiSearchOptions = (query: string) =>
  queryOptions({
    queryKey: ["multi-search", query],
    queryFn: async () => {
      const response = await tmdb.get("/search/multi", {
        params: {
          query: query,
        },
      });
      return response.data.results;
    },
    enabled: false,
  });
