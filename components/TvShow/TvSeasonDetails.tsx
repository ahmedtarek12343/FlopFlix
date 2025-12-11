"use client";

import { useTvSeasonDetails } from "@/hooks/useTvOptionsById";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoveLeftIcon, PlayIcon, ImagesIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Actor, VideoResult } from "@/types/types";
import Link from "next/link";

const TvSeasonDetails = ({
  id,
  seasonNumber,
}: {
  id: string;
  seasonNumber: string;
}) => {
  const {
    data: seasonDetails,
    isPending,
    isError,
  } = useTvSeasonDetails(Number(id), Number(seasonNumber));
  console.log(seasonDetails);

  const router = useRouter();

  if (isPending) return <div className="p-10 text-center">Loading...</div>;
  if (isError)
    return <div className="p-10 text-center">Error loading season</div>;

  const episodes = seasonDetails.episodes || [];
  const posters = seasonDetails.images?.posters || [];
  const videos = seasonDetails.videos?.results || [];
  const credits = seasonDetails.credits?.cast || [];

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="cursor-pointer flex gap-3 top-5 left-5 absolute z-50"
      >
        <MoveLeftIcon /> Back
      </Button>

      {/* Background Poster */}
      <Image
        src={`https://image.tmdb.org/t/p/original${seasonDetails.poster_path}`}
        alt=""
        width={800}
        height={800}
        className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-5 py-20 space-y-12">
        {/* Title & Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{seasonDetails.name}</h1>

          <div className="flex gap-3 text-sm opacity-70">
            <span>Air Date: {seasonDetails.air_date}</span>
            <span>•</span>
            <span>{episodes.length} Episodes</span>
            <span>•</span>
            <span>Rating: {seasonDetails.vote_average.toFixed(1)}</span>
          </div>
        </div>

        {/* Overview */}
        <p className="text-lg leading-relaxed opacity-90 max-w-3xl">
          {seasonDetails.overview}
        </p>

        {/* Episodes Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {episodes.map((ep: any) => (
              <div
                key={ep.id}
                className="flex gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-md border hover:border-primary transition-colors duration-200"
              >
                <Image
                  src={
                    ep.still_path
                      ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                      : "/placeholder.png" // MUST start with /
                  }
                  alt={ep.name}
                  width={140}
                  height={100}
                  className="rounded-xl aspect-video object-cover"
                />
                <div>
                  <p className="text-sm opacity-70">
                    Episode {ep.episode_number}
                  </p>
                  <h3 className="font-semibold">{ep.name}</h3>
                  <p className="text-sm opacity-70 mt-1 line-clamp-3">
                    {ep.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        {videos.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <PlayIcon className="w-5 h-5" />
              <h2 className="text-2xl font-semibold">Videos</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {videos.map((v: VideoResult) => (
                <a
                  key={v.id}
                  href={`https://youtube.com/watch?v=${v.key}`}
                  target="_blank"
                  className="min-w-[300px] rounded-xl overflow-hidden border border-border"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${v.key}/hqdefault.jpg`}
                    alt={v.name}
                    width={300}
                    height={200}
                    className="rounded-xl"
                  />
                  <p className="p-2 text-sm">{v.name}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Images Section */}
        {posters.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ImagesIcon className="w-5 h-5" />
              <h2 className="text-2xl font-semibold">Images</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {posters.map((img: { file_path: string }) => (
                <Image
                  key={img.file_path}
                  src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                  alt=""
                  width={200}
                  height={300}
                  className="rounded-xl"
                />
              ))}
            </div>
          </section>
        )}

        {/* Cast Section */}
        {credits.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <UsersIcon className="w-5 h-5" />
              <h2 className="text-2xl font-semibold">Cast</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {credits.slice(0, 20).map((actor: Actor) => (
                <Link
                  href={`/actors/${actor.id}`}
                  key={actor.id}
                  className="text-center min-w-[120px]"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    width={120}
                    height={150}
                    className="rounded-xl object-cover"
                  />
                  <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                  <p className="text-xs opacity-70">{actor.character}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TvSeasonDetails;
