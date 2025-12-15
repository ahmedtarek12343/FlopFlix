"use client";
import { useDiscoverMoviesByPageNum } from "@/hooks/useDiscoverMovies";
import { MovieType, TvWithExtras } from "@/types/types";
import Pagination from "./Pagination";
import { usePaginationStore } from "@/store/pagination.store";
import { Loader2Icon } from "lucide-react";
import MovieCard from "../Movie/MovieCard";
import MovieFilters from "./MovieFilters";
import { useFiltersStore } from "@/store/filters.store";
import TvCard from "../TvShow/TvCard";
import { useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";

const MovieShow = () => {
  const { pageNum, setPageNum } = usePaginationStore();
  const { filters } = useFiltersStore();
  const { data, isPending, isError, refetch } = useDiscoverMoviesByPageNum(
    pageNum,
    filters
  );

  useEffect(() => {
    setPageNum(1);
  }, []);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorFallback refetch={refetch} />;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <h2 className="text-2xl font-bold">
            Popular
            {filters.type === "movie" ? " Movies" : " TV Shows"}
          </h2>{" "}
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary mt-1 rounded-full"></div>
          <p className="text-sm text-muted-foreground mt-1">
            Trending {filters.type === "movie" ? "movies" : "tv shows"} everyone
            is talking about right now.
          </p>{" "}
        </motion.div>
        <MovieFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.map((movie: any, index: number) =>
          filters.type === "movie" ? (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05, // Small stagger based on position
                ease: "easeOut",
              }}
            >
              <MovieCard movie={movie as MovieType} />
            </motion.div>
          ) : (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <TvCard show={movie as TvWithExtras} />
            </motion.div>
          )
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default MovieShow;
