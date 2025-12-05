// store/filters.store.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export interface MovieFilters {
  sortBy: string; // "popularity.desc", "vote_average.desc", "release_date.desc"
  type: string; // "movie", "tv"
  genres: number[]; // Array of genre IDs
  year?: number;
  language?: string;
}

interface FiltersStore {
  filters: MovieFilters;
  resetFilters: () => void;
  setSortBy: (sortBy: string) => void;
  setType: (type: string) => void;
  toggleGenre: (genreId: number) => void;
  setYear: (year: number | undefined) => void;
}

const defaultMovieFilters: MovieFilters = {
  sortBy: "popularity.desc",
  type: "movie",
  genres: [],
  year: undefined,
  language: "en",
};

const defaultTvFilters: MovieFilters = {
  sortBy: "popularity.desc",
  type: "tv",
  genres: [],
  year: undefined,
  language: "en",
};

export const useFiltersStore = create<FiltersStore>()(
  persist(
    immer((set) => ({
      filters: defaultMovieFilters,

      resetFilters: () =>
        set((state) => {
          state.filters =
            state.filters.type === "movie"
              ? defaultMovieFilters
              : defaultTvFilters;
        }),

      setSortBy: (sortBy) =>
        set((state) => {
          state.filters.sortBy = sortBy;
        }),

      setType: (type) =>
        set((state) => {
          state.filters.type = type;
        }),

      toggleGenre: (genreId) =>
        set((state) => {
          const index = state.filters.genres.indexOf(genreId);
          if (index > -1) {
            state.filters.genres.splice(index, 1);
          } else {
            state.filters.genres.push(genreId);
          }
        }),

      setYear: (year) =>
        set((state) => {
          state.filters.year = year;
        }),
    })),
    {
      name: "movie-filters",
    }
  )
);
