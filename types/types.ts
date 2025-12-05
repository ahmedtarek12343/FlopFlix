import { Movie } from "@/app/generated/prisma/browser";

export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
}

// Adjust the type based on your API structure
export interface TVType {
  id: number;
  name: string;
  overview: string;
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Rating {
  Source: string;
  Value: string;
  Image: string;
}

export interface MovieWithVideos extends Movie {
  videos: Video[];
  Plot: string;
  BoxOffice: string;
  Awards: string;
  Production: string;
  Director: string;
  Writer: string;
  Actors: string;
  Ratings: Rating[];
  Genre: string;
  Language: string;
  Runtime: string;
  Type: string;
  budget: string;
  revenue: string;
  Rated: string;
  Year: string;
  production_companies: string[];
}

export interface TvWithVideos {
  id: number;
  name: string;
  overview: string;
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  videos: Video[];
}
