"use client";

import {
  useTvAggregateCredits,
  useTvImages,
  useTvOptionsById,
  useTvReviews,
  useTvSimilar,
} from "@/hooks/useTvOptionsById";
import {
  Loader2Icon,
  Calendar,
  Clock,
  Star,
  Users,
  Globe,
  Tv,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

const TvShowCase = ({ id }: { id: number }) => {
  const { data: show, isPending, isError } = useTvOptionsById(id);
  const { data: credits } = useTvAggregateCredits(id);
  const { data: images } = useTvImages(id);
  const { data: reviews } = useTvReviews(id);
  const { data: similar } = useTvSimilar(id);
  console.log(show, credits, images, reviews, similar);
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2Icon className="size-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-white/80">Loading TV Show...</p>
      </div>
    );
  }

  if (isError || !show) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-900 to-red-900">
        <p className="text-2xl text-white">Error loading TV Show</p>
      </div>
    );
  }

  const backdropUrl = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : null;

  const trailerKey = show.videos?.find((v: any) => v.type === "Trailer")?.key;

  return (
    <div className="min-h-screen relative bg-background text-white">
      <div className="absolute top-5 left-5 z-10">
        <Button variant="ghost" asChild>
          <Link href="/popular" className="flex items-center gap-2">
            <ArrowLeft className="size-6" />
            <span>Back to TV Shows</span>
          </Link>
        </Button>
      </div>
      {/* Hero Backdrop */}
      {backdropUrl && (
        <div className="relative h-[60vh] md:h-[80vh]">
          <Image
            src={backdropUrl}
            alt={show.name}
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      )}

      <div className="relative -mt-32 md:-mt-48 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Poster + Key Info */}
          <div className="space-y-6">
            <div className="relative">
              <div className="backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border ">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  width={500}
                  height={750}
                  className="w-full rounded-t-2xl"
                />
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="size-6 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold">
                      {show.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400">/10</span>
                    <span className="text-sm text-gray-500">
                      ({show.vote_count.toLocaleString()} votes)
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      show.status === "Ended"
                        ? "bg-red-900/50 text-red-300"
                        : show.status === "Returning Series"
                        ? "bg-green-900/50 text-green-300"
                        : "bg-blue-900/50 text-blue-300"
                    }`}
                  >
                    {show.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur border  rounded-xl p-4">
                <Calendar className="size-5 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">First Air</p>
                <p className="font-semibold">
                  {show.first_air_date
                    ? format(new Date(show.first_air_date), "MMM d, yyyy")
                    : "N/A"}
                </p>
              </div>
              <div className=" backdrop-blur border  rounded-xl p-4">
                <Clock className="size-5 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">Seasons</p>
                <p className="font-semibold">{show.number_of_seasons}</p>
              </div>
              <div className=" backdrop-blur border  rounded-xl p-4">
                <Tv className="size-5 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">Episodes</p>
                <p className="font-semibold">{show.number_of_episodes}</p>
              </div>
              <div className=" backdrop-blur border  rounded-xl p-4">
                <Users className="size-5 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">Popularity</p>
                <p className="font-semibold">{Math.round(show.popularity)}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-lg leading-relaxed text-gray-300">
                {show.overview || "No overview available."}
              </p>
            </section>

            {/* Genres */}
            {show.genres.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-primary/40 border-primary rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Networks */}
            {show.networks.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-3">Networks</h3>
                <div className="flex flex-wrap gap-6">
                  {show.networks.map((network) => (
                    <div key={network.id} className="flex items-center gap-3">
                      {network.logo_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                          alt={network.name}
                          width={80}
                          height={40}
                          className="bg-white/10 rounded p-1"
                        />
                      ) : (
                        <span className="text-lg font-medium">
                          {network.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Created By */}
            {show.created_by.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-3">Created By</h3>
                <div className="flex flex-wrap gap-6">
                  {show.created_by.map((creator) => (
                    <div key={creator.id} className="flex items-center gap-4">
                      {creator.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${creator.profile_path}`}
                          alt={creator.name}
                          width={64}
                          height={64}
                          className="rounded-full w-16 h-16 border-2 object-cover border-gray-700"
                        />
                      ) : (
                        <div className="size-16 bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="size-8 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">
                          <Link
                            href={`https://en.wikipedia.org/wiki/${creator.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {creator.name}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-800">
              {show.original_language && (
                <div className="flex items-center gap-3">
                  <Globe className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Original Language</p>
                    <p className="font-medium uppercase">
                      {show.original_language}
                    </p>
                  </div>
                </div>
              )}
              {show.homepage && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Official Site</p>
                  <a
                    href={show.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {show.homepage.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      {show.seasons.length > 0 && (
        <section className="px-15 py-10">
          <h2 className="text-3xl font-bold mb-8">Seasons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {show.seasons.map((season) => (
              <Link
                href={`/tv/${show.id}/season/${season.season_number}`}
                key={season.id}
                className="backdrop-blur border rounded-xl p-4 flex justify-between items-center hover:border-primary transition-all"
              >
                <div className="">
                  <p className="text-sm text-gray-500">
                    Season {season.season_number}
                  </p>
                  <p className="font-semibold">{season.name}</p>
                </div>{" "}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  alt={season.name}
                  width={200}
                  height={200}
                  className="rounded-xl w-24 h-24 object-cover"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
      {trailerKey && (
        <section className="px-15 py-10">
          <h2 className="text-3xl font-bold mb-8">Official Trailer</h2>
          <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default TvShowCase;
