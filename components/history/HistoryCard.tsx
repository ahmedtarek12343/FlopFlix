"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Tilt } from "../motion-primitives/tilt";

const HistoryCard = ({ item }: { item: any }) => {
  const [loading, setLoading] = useState(true);
  const title = item.title || "Unknown Title";
  const date = item.release_date
    ? new Date(item.release_date).getFullYear()
    : "N/A";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const overview = item.overview ? item.overview.slice(0, 80) + "..." : "";
  const linkHref =
    item.type === "Movie"
      ? `/movie/${item.contentId}`
      : `/tv/${item.contentId}`;

  return (
    <div className="relative group">
      <Link href={linkHref}>
        <Tilt rotationFactor={6} isRevese>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-md border border-border/50 bg-card">
            {loading && <Skeleton className="absolute inset-0 z-10" />}
            <Image
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : "/placeholder.png"
              }
              alt={title}
              fill
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                loading ? "opacity-0" : "opacity-100"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            <div className="absolute top-2 right-2">
              <Badge
                variant={item.type === "Movie" ? "default" : "secondary"}
                className="text-xs font-bold"
              >
                {item.type}
              </Badge>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 mb-1">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                <span>{date}</span>
                <span>•</span>
                <span
                  className={cn(
                    "font-bold",
                    Number(rating) >= 7 ? "text-green-400" : "text-yellow-400"
                  )}
                >
                  ★ {rating}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {overview}
              </p>
            </div>
          </div>
        </Tilt>
      </Link>
    </div>
  );
};

export default HistoryCard;
