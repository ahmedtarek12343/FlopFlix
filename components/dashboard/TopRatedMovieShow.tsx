"use client";
import { useGetTopRatedMovies } from "@/hooks/useGetTopRatedMovies";
import { MovieType } from "@/types/types";
import Pagination from "./Pagination";
import { usePaginationStore } from "@/store/pagination.store";
import MovieCard from "../MovieCard";
const TopRatedMovieShow = () => {
  const { pageNum } = usePaginationStore();
  const { data } = useGetTopRatedMovies(pageNum);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Top Rated Movies</h2>{" "}
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary mt-1 rounded-full"></div>
          <p className="text-sm text-muted-foreground mt-1">
            Top rated films everyone is talking about right now.
          </p>{" "}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.map((movie: MovieType) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default TopRatedMovieShow;
