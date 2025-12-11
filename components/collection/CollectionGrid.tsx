"use client";

import MovieCard from "../Movie/MovieCard";
import { MovieType } from "@/types/types";

interface CollectionGridProps {
  movies: MovieType[];
}

export const CollectionGrid = ({ movies }: CollectionGridProps) => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold mb-10 pl-4 border-l-4 border-primary">
        Movies in this Collection
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {movies?.map((movie: MovieType) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
