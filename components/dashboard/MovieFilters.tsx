// components/dashboard/MovieFilters.tsx
"use client";
import { useFiltersStore } from "@/store/filters.store";
import { useQuery } from "@tanstack/react-query";
import { genreOptions } from "@/lib/queryOptions/movie.options";
import { useTvGenre } from "@/hooks/useTvGenre";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon, XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const MovieFilters = () => {
  const { filters, setSortBy, toggleGenre, setYear, resetFilters, setType } =
    useFiltersStore();

  const { data: movieGenres, isPending } = useQuery(genreOptions());
  const { data: tvGenres } = useTvGenre();

  const movieSortOptions = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Newest First" },
    { value: "release_date.asc", label: "Oldest First" },
    { value: "title.asc", label: "A-Z" },
    { value: "title.desc", label: "Z-A" },
  ];

  const tvSortOptions = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "first_air_date.desc", label: "Newest First" },
    { value: "first_air_date.asc", label: "Oldest First" },
    { value: "name.asc", label: "A-Z" },
    { value: "name.desc", label: "Z-A" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const activeFiltersCount =
    filters.genres.length +
    (filters.year ? 1 : 0) +
    (filters.sortBy !== "popularity.desc" ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="default"
              className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]  sm:w-[540px] overflow-y-auto p-5 scrollbar-hide">
        <div className="mt-10">
          <SheetTitle>Type</SheetTitle>
          <SheetDescription>
            Select the type of content you want to filter
          </SheetDescription>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant={filters.type === "movie" ? "default" : "outline"}
              onClick={() => setType("movie")}
            >
              Movie
            </Button>
            <Button
              variant={filters.type === "tv" ? "default" : "outline"}
              onClick={() => setType("tv")}
            >
              TV Show
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={resetFilters}
              className="w-full"
            >
              <XIcon className="mr-2 h-4 w-4" />
              Clear All Filters
            </Button>
          )}

          {/* Sort By */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Sort By</h3>
            <div className="grid grid-cols-2 gap-2">
              {filters.type === "movie"
                ? movieSortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        filters.sortBy === option.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSortBy(option.value)}
                      className="justify-start"
                    >
                      {option.label}
                    </Button>
                  ))
                : tvSortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        filters.sortBy === option.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSortBy(option.value)}
                      className="justify-start"
                    >
                      {option.label}
                    </Button>
                  ))}
            </div>
          </div>

          <Separator />

          {/* Genres */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Genres</h3>
            {isPending ? (
              <p className="text-sm text-muted-foreground">Loading genres...</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filters.type === "movie"
                  ? movieGenres?.map((genre: { id: number; name: string }) => (
                      <Badge
                        key={genre.id}
                        variant={
                          filters.genres.includes(genre.id)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => toggleGenre(genre.id)}
                      >
                        {genre.name}
                      </Badge>
                    ))
                  : tvGenres?.map((genre: { id: number; name: string }) => (
                      <Badge
                        key={genre.id}
                        variant={
                          filters.genres.includes(genre.id)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => toggleGenre(genre.id)}
                      >
                        {genre.name}
                      </Badge>
                    ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Year */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Release Year</h3>
            <div className="grid grid-cols-5 gap-2 max-h-[200px] overflow-y-auto p-1">
              <Button
                variant={!filters.year ? "default" : "outline"}
                size="sm"
                onClick={() => setYear(undefined)}
              >
                All
              </Button>
              {years.map((year) => (
                <Button
                  key={year}
                  variant={filters.year === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setYear(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MovieFilters;
