"use client";
import { useState } from "react";
import Image from "next/image";
import { MovieType } from "@/types/types";
import { Tilt } from "@/components/motion-primitives/tilt";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { movieOptionsById } from "@/lib/queryOptions/movie.options";
import { useQueryClient } from "@tanstack/react-query";
import OptionBar from "../OptionBar";
import { useTransitionStore } from "@/store/transition.store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const { setExpandingCard } = useTransitionStore();
  const router = useRouter();

  const src = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.png";

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Get the card's position
    const cardElement = e.currentTarget.querySelector(".card-image");
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();

      setExpandingCard({
        id: movie.id,
        src,
        initialPosition: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
      });

      // Navigate after animation starts
      setTimeout(() => {
        router.push(`/movie/${movie.id}`);
      }, 300);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => queryClient.prefetchQuery(movieOptionsById(movie.id))}
      className="cursor-pointer"
    >
      <div className="relative overflow-hidden group z-50">
        <Tilt rotationFactor={6}>
          <div className="relative w-full aspect-video overflow-hidden rounded card-image">
            {/* Skeleton */}
            {loading && <Skeleton className="absolute inset-0" />}

            <Image
              src={src}
              alt={movie.title || "Movie"}
              fill
              loading="lazy"
              className={cn(
                "object-cover transition-opacity duration-300",
                loading ? "opacity-0" : "opacity-100"
              )}
              onLoadingComplete={() => setLoading(false)}
            />

            <div className="absolute inset-0 bg-black/10" />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute top-2 right-2 z-5"
            >
              {movie.vote_average &&
              Number(movie.vote_average.toFixed(1)) > 7 ? (
                <Badge className="bg-green-500 text-white px-2 py-1 rounded">
                  {movie.vote_average.toFixed(1)}
                </Badge>
              ) : (
                <Badge className="bg-yellow-500 text-white px-2 py-1 rounded">
                  {movie.vote_average && movie.vote_average.toFixed(1)}
                </Badge>
              )}
            </motion.div>
          </div>

          <div className="mt-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(movie.release_date).getFullYear() || "N/A"}
              </p>
            </div>
            <p className="text-sm text-gray-500 max-w-md w-full">
              {movie.overview?.slice(0, 100)}...
            </p>
          </div>
        </Tilt>
        <OptionBar content={movie} type="Movie" />
      </div>
    </div>
  );
};

export default MovieCard;
