"use client";
import { useDiscoverMoviesByPageNum } from "@/hooks/useDiscoverMovies";
import { MovieType } from "@/types/types";
import Pagination from "./Pagination";
import { usePaginationStore } from "@/store/pagination.store";
import { Loader2Icon } from "lucide-react";
import MovieCard from "../MovieCard";
import MovieFilters from "./MovieFilters";
import { useFiltersStore } from "@/store/filters.store";
import TvCard from "../TvCard";

const MovieShow = () => {
  const { pageNum } = usePaginationStore();
  const { filters } = useFiltersStore();
  const { data, isPending, isError } = useDiscoverMoviesByPageNum(
    pageNum,
    filters
  );
  console.log(data);

  if (isPending)
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <Loader2Icon className="animate-spin size-12 text-primary" />
        <p>Loading Movies...</p>
      </div>
    );
  if (isError) return <p>Error loading movies</p>;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Popular Movies</h2>{" "}
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary mt-1 rounded-full"></div>
          <p className="text-sm text-muted-foreground mt-1">
            Trending films everyone is talking about right now.
          </p>{" "}
        </div>
        <MovieFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.map((movie: MovieType) =>
          filters.type === "movie" ? (
            <MovieCard key={movie.id} movie={movie} />
          ) : (
            <TvCard key={movie.id} show={movie} />
          )
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default MovieShow;
