import Image from "next/image";
import { Star, Calendar, Clock, Tv, Users, Globe } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import LazyImage from "../LazyImage";
import { TvWithExtras } from "@/types/types";

const TvPoster = ({ show }: { show: TvWithExtras }) => {
  return (
    <div className="relative -mt-32 md:-mt-48 max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Poster + Key Info */}
        <div className="space-y-6">
          <div className="relative">
            <div className="backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border ">
              <LazyImage
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
  );
};

export default TvPoster;
