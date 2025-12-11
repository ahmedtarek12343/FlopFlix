export interface Actor {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  gender: string; // Converted string from enum
  homepage: string | null;

  // Appends
  external_ids: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    tiktok_id: string | null;
    youtube_id: string | null;
  };

  images: {
    profiles: ImageType[];
  };

  tagged_images?: {
    results: ImageType[];
  };

  movie_credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };

  tv_credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface ImageType {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export interface CastMember {
  id: number;
  title?: string;
  name?: string; // TV shows use name
  poster_path: string | null;
  character: string;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export interface CrewMember {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  job: string;
  department: string;
}
