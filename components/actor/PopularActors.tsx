"use client";

import { useGetPopularActors } from "@/hooks/useGetActor";
import LazyImage from "../LazyImage";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";

const PopularActors = () => {
  const { data: actors, isPending, isError, refetch } = useGetPopularActors();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorFallback refetch={refetch} />;
  }

  if (!actors || actors.length === 0) {
    return (
      <div className="text-center text-gray-400">No popular actors found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {actors.map((actor: any, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={actor.id}
        >
          <Link
            href={`/actors/${actor.id}`}
            className="group relative flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-900 shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/10">
              <div className="absolute  inset-0 z-0 bg-gray-800">
                <LazyImage
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "/placeholder.png"
                  }
                  alt={actor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Hover Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold mb-1">
                  <TrendingUp size={12} />
                  <span>Popularity: {Math.round(actor.popularity)}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-primary">
                {actor.name}
              </h3>
              <p className="line-clamp-1 text-xs text-gray-400">
                {actor.known_for
                  ?.map((item: any) => item.title || item.name)
                  .join(", ")}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PopularActors;
