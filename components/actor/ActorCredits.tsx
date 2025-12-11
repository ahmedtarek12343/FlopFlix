import Link from "next/link";
import Image from "next/image";
import { CastMember } from "./types";
import { Star } from "lucide-react";

interface ActorCreditsProps {
  title: string;
  items: CastMember[];
  type: "movie" | "tv";
}

export const ActorCredits = ({ title, items, type }: ActorCreditsProps) => {
  if (!items || items.length === 0) return null;

  // Filter out items without posters or significant data if desired,
  // currently we show everything but use placeholder if missing poster.

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white px-1">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-4 px-1">
        {items
          .sort((a, b) => b.popularity - a.popularity)
          .map((item, id) => (
            <Link
              key={id}
              href={`/${type}/${item.id}`}
              className="min-w-[160px] max-w-[160px] group"
            >
              <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-gray-900 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20">
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={item.title || item.name || "Unknown Title"}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                />

                {/* Rating badge */}
                {item.vote_average > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-xs font-semibold text-amber-400">
                    <Star size={10} fill="currentColor" />
                    <span>{item.vote_average.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                  {item.title || item.name}
                </p>
                {item.character && (
                  <p className="text-xs text-gray-400 truncate">
                    as <span className="text-gray-300">{item.character}</span>
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
