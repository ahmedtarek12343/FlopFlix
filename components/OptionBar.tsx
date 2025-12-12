"use client";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { MovieType, TvWithExtras } from "@/types/types";
import { useGetDbFavorites } from "@/hooks/useGetDbFavorites";
import { useAddFavorite } from "@/lib/mutations/useAddFavorite";
import { useRemoveFavorite } from "@/lib/mutations/useRemoveFavorite";

interface OptionBarProps {
  content: MovieType | TvWithExtras;
  type: "Movie" | "TV";
}

const OptionBar = ({ content, type }: OptionBarProps) => {
  const { data: favorites } = useGetDbFavorites();
  const isFavorite = favorites?.some(
    (fav) => fav.contentId === content.id && fav.type === type
  );
  const { mutate: toggleFavorite, isPending } = useAddFavorite();
  const { mutate: deleteFavorite } = useRemoveFavorite(content.id, type);
  const isMovie = type === "Movie";

  return (
    <div className="absolute flex flex-col items-center gap-2 top-2 -left-9 group-hover:left-2 transition-all duration-300">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (isFavorite) {
            deleteFavorite();
          } else {
            toggleFavorite({
              contentId: content.id,
              title: isMovie
                ? (content as MovieType).title
                : (content as TvWithExtras).name,
              backdrop_path: content.backdrop_path,
              overview: content.overview,
              release_date: isMovie
                ? (content as MovieType).release_date
                : (content as TvWithExtras).first_air_date,
              vote_average: content.vote_average,
              type: type,
            });
          }
        }}
        disabled={isPending}
        variant="default"
        size="icon"
      >
        <Heart
          className={cn(
            isFavorite
              ? "fill-red-500 text-red-500"
              : "fill-gray-500 text-gray-500"
          )}
        />
      </Button>
    </div>
  );
};

export default OptionBar;
