"use client";
import { useGetDbFavorites } from "@/hooks/useGetDbFavorites";
import MovieCard from "../Movie/MovieCard";
import TVCard from "../TvShow/TvCard";
import { MovieType, TvWithExtras } from "@/types/types";
import GradientText from "../GradientText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FavoriteMovieCard from "./FavoriteMovieCard";
import FavoriteShowCard from "./FavoriteShowCard";

export default function FavoritesComp() {
  const { data: favorites, isLoading } = useGetDbFavorites();

  const movieQueries = favorites?.filter((fav) => fav.type === "Movie");

  const tvQueries = favorites?.filter((fav) => fav.type === "TV");

  const movies = movieQueries || [];
  const shows = tvQueries || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mb-6" />
        <p className="text-2xl text-white/80 font-light">
          Loading Favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="rounded-none p-5"
          >
            My Favorites
          </GradientText>
        </h1>
        <div className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/10">
          {movies.length + shows.length} Items
        </div>
      </div>

      {movies.length + shows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-2xl font-bold text-gray-500 mb-2">
            No favorites yet
          </p>
          <p className="text-gray-400">
            Start adding movies and TV shows to your collection!
          </p>
        </div>
      ) : (
        <Tabs defaultValue="movies" className="w-full">
          <TabsList>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="shows">TV Shows</TabsTrigger>
          </TabsList>
          <TabsContent value="movies">
            {movies.length === 0 ? (
              <p className="text-gray-500">No movies favorited yet</p>
            ) : (
              movies.map((movie) => (
                <FavoriteMovieCard key={movie.id} movie={movie} />
              ))
            )}
          </TabsContent>
          <TabsContent value="shows">
            {shows.length === 0 ? (
              <p className="text-gray-500">No TV shows favorited yet</p>
            ) : (
              shows.map((show) => (
                <FavoriteShowCard key={show.id} show={show} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
