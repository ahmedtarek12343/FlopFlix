"use client";

import { Input } from "./ui/input";
import { useSearchMovie } from "@/hooks/useSearchMovie";
import { useState } from "react";
import { Button } from "./ui/button";
import TvCard from "./TvShow/TvCard";
import MovieCard from "./Movie/MovieCard";
import ActorCard from "./actor/ActorCard";

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading, isError } = useSearchMovie(searchQuery);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-5">
        Search For Movies, TV Shows & Actors
      </h1>
      <div className="relative max-w-5xl mx-auto mt-10">
        <Input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="py-5"
          placeholder="Type to search..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              refetch();
            }
          }}
        />
        <Button
          disabled={!searchQuery.trim()}
          onClick={() => {
            refetch();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </div>
      {isLoading && (
        <p className="mt-5 text-muted-foreground animate-pulse">Loading...</p>
      )}
      {isError && <p className="mt-5 text-red-400">Error loading data</p>}
      {!isLoading && data?.length === 0 && (
        <p className="mt-5 text-muted-foreground">No results found.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 max-w-7xl mx-auto">
        {data
          ?.filter(
            (x: { media_type: string }) =>
              x.media_type === "movie" ||
              x.media_type === "tv" ||
              x.media_type === "person"
          )
          .map((item: any) => {
            if (item.media_type === "tv")
              return <TvCard show={item} key={item.id} />;
            if (item.media_type === "person")
              return <ActorCard actor={item} key={item.id} />;
            return <MovieCard movie={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};

export default SearchHeader;
