export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

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
  certification: string;
  first_air_date: string;
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
  tagline: string;
  Year: string;
  production_companies: string[];
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

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Company {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
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
  networks: Network[];
  production_companies: Company[];
  production_countries: string[];
  spoken_languages: Language[];
  original_language: string;
  tagline: string;
  videos: Video[];
  vote_count: number;
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  popularity: number;
  genres: Genre[];
  created_by: Creator[];
  seasons: Season[];
  homepage: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface MovieReview {
  id: number;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  created_at: string;
  content: string;
  url: string;
}
