import { queryOptions } from "@tanstack/react-query";
import tmdb from "../tmdb";
import omdb from "../omdb";
import { Movie } from "@/app/generated/prisma/client";
import { MovieWithVideos, Video } from "@/types/types";

export const movieOptions = queryOptions({
  queryKey: ["movies"],
  queryFn: async () => {
    const [moviesRes, genresRes] = await Promise.all([
      tmdb.get("/discover/movie"),
      tmdb.get("/genre/movie/list"),
    ]);
    const movies = moviesRes.data;
    const genres = genresRes.data.genres;

    const moviesWithGenres = movies.results.map((movie: Movie) => {
      return {
        ...movie,
        genres: movie.genre_ids.map((id) => {
          return genres.find(
            (genre: { id: number; name: string }) => genre.id === id
          )?.name;
        }),
      };
    });
    return moviesWithGenres;
  },
});

export const movieOptionsbyPageNum = (pageNum: number) => {
  return queryOptions({
    queryKey: ["movies", pageNum],
    queryFn: async () => {
      const moviesRes = await tmdb.get("/movie/popular", {
        params: {
          page: pageNum,
        },
      });
      const movies = moviesRes.data;
      return movies.results;
    },
  });
};

export const topRatedMovieOptions = (pageNum: number) => {
  return queryOptions({
    queryKey: ["top-rated-movies", pageNum],
    queryFn: async () => {
      const moviesRes = await tmdb.get("/movie/top_rated", {
        params: {
          page: pageNum,
        },
      });
      const movies = moviesRes.data;
      return movies.results;
    },
  });
};

export const searchMovieOptions = (query: string) => {
  return queryOptions({
    queryKey: ["search-movies", query],
    queryFn: async () => {
      const moviesRes = await tmdb.get("/search/movie", {
        params: {
          query: query,
        },
      });
      const movies = moviesRes.data;
      return movies.results;
    },
  });
};

export const movieOptionsById = (id: number) => {
  return queryOptions({
    queryKey: ["movie", id],
    queryFn: async (): Promise<MovieWithVideos> => {
      const [dataRes, videoRes] = await Promise.all([
        tmdb.get(`/movie/${id}`),
        tmdb.get(`/movie/${id}/videos`),
      ]);
      const data = dataRes.data;
      const videos = videoRes.data.results;

      const omdbRes = await omdb.get(`/?i=${data.imdb_id}`);
      const omdbData = omdbRes.data;
      const movie = {
        ...data,
        videos: videos,
        ...omdbData,
      };
      return movie;
    },
  });
};
