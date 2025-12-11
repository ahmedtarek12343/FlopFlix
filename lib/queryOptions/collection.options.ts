import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";

export const collectionOptions = (id: number) => {
  return queryOptions({
    queryKey: ["collection", id],
    queryFn: async () => {
      const res = await tmdb.get(`/collection/${id}`);
      return res.data;
    },
  });
};
