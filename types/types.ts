export interface Actor {
  id: number;
  cast_id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface MovieType {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  genre_ids: number[];
  Director: string;
  Genre: string;
  Language: string;
  MetaScore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  credits: {
    cast: Cast[];
  };
  genres: Genre[];
  homepage: string;
  id: number;
  images: {
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
  };
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: string[];
  recommendations: Recommendations;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: Video;
  vote_average: number;
  vote_count: number;
  reviews: Reviews;
  similar: Similar;
  first_air_date: string;
  name: string;
}

export interface Similar {
  id: number;
  results: MovieType[];
}

export interface Video {
  id: number;
  results: VideoResult[];
}

export interface VideoResult {
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

export interface Reviews {
  id: number;
  results: MovieReview[];
}

export interface Recommendations {
  id: number;
  results: MovieType[];
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
}

export interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  profile_path: string;
  popularity: number;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
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

export interface TvWithExtras {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: string[];
  seasons: Season[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: Cast[];
  };
  reviews: {
    results: MovieReview[];
  };
  networks: Network[];
  images: {
    backdrops: Image[];
    posters: Image[];
    logos: Image[];
  };
  videos: {
    results: VideoResult[];
  };
  recommendations: {
    results: TvWithExtras[];
  };
  similar: {
    results: TvWithExtras[];
  };
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

export interface tvSeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}
