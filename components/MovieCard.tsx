"use client";
import { useState } from "react";
import Image from "next/image";
import { MovieType } from "@/types/types";
import { Tilt } from "@/components/motion-primitives/tilt";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const [loading, setLoading] = useState(true);

  const src = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.png";

  return (
    <Link href={`/movie/${movie.id}`}>
      <Tilt rotationFactor={6}>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded">
          {/* Skeleton */}
          {loading && <Skeleton className="absolute inset-0" />}

          <Image
            src={src}
            alt={movie.title}
            fill
            loading="lazy"
            className={cn(
              "object-cover transition-opacity duration-300",
              loading ? "opacity-0" : "opacity-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-2 right-2 z-5">
            {Number(movie.vote_average.toFixed(1)) > 7 ? (
              <Badge className="bg-green-500 text-white px-2 py-1 rounded">
                {movie.vote_average.toFixed(1)}
              </Badge>
            ) : (
              <Badge className="bg-yellow-500 text-white px-2 py-1 rounded">
                {movie.vote_average.toFixed(1)}
              </Badge>
            )}
            <Badge className="bg-gray-500 ml-2 text-white px-2 py-1 rounded">
              {movie.adult ? "R" : "PG-13"}
            </Badge>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
          <p className="text-sm text-gray-500 max-w-md w-full">
            {movie.overview.slice(0, 100)}...
          </p>
        </div>
      </Tilt>
    </Link>
  );
};

export default MovieCard;
