"use client";

import { Input } from "./ui/input";
import { useSearchMovie } from "@/hooks/useSearchMovie";
import { useState } from "react";
import { Button } from "./ui/button";
import TvCard from "./TvCard";
import MovieCard from "./Movie/MovieCard";

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading, isError } = useSearchMovie(searchQuery);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-5">
        Search For Movies, TV Shows
      </h1>
      <div className="relative">
        <Input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="py-5"
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {!isLoading && data?.length === 0 && (
        <p className="mt-5 text-muted-foreground">No results found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-7xl mx-auto">
        {data
          ?.filter(
            (x: any) => x.media_type === "movie" || x.media_type === "tv"
          )
          .map((item: any) =>
            item.media_type === "tv" ? (
              <TvCard show={item} key={item.id} />
            ) : (
              <MovieCard movie={item} key={item.id} />
            )
          )}
      </div>
    </div>
  );
};

export default SearchHeader;
