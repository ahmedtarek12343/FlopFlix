"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { TvWithExtras } from "@/types/types";
import { tvOptionsById } from "@/lib/queryOptions/tv.options";
import { useQueryClient } from "@tanstack/react-query";
import OptionBar from "../OptionBar";

const TVCard = ({ show }: { show: TvWithExtras }) => {
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  const src = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : "/placeholder.png";

  return (
    <Link
      href={`/tv/${show.id}`}
      onMouseEnter={() => queryClient.prefetchQuery(tvOptionsById(show.id))}
    >
      <div className="relative overflow-hidden group z-50">
        <Tilt rotationFactor={6}>
          <div className="relative w-full aspect-video overflow-hidden rounded">
            {/* Skeleton while image loads */}
            {loading && <Skeleton className="absolute inset-0" />}

            <Image
              src={src}
              alt={show.name || ""}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                loading ? "opacity-0" : "opacity-100"
              )}
              onLoadingComplete={() => setLoading(false)}
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Rating + Adult badge */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <Badge
                className={
                  Number(show.vote_average.toFixed(1)) > 7
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                }
              >
                {show.vote_average.toFixed(1)}
              </Badge>
            </div>
          </div>

          {/* Text section */}
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{show.name}</h3>

              <p className="text-sm text-gray-500">
                {show.first_air_date
                  ? new Date(show.first_air_date).getFullYear()
                  : "N/A"}
              </p>
            </div>

            <p className="text-sm text-gray-500 max-w-md w-full">
              {show.overview
                ? show.overview.slice(0, 100) + "..."
                : "No overview"}
            </p>
          </div>
        </Tilt>
        <OptionBar content={show} type="TV" />
      </div>
    </Link>
  );
};

export default TVCard;
