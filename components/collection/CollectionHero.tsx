"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CollectionHeroProps {
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  movieCount: number;
}

export const CollectionHero = ({
  name,
  overview,
  backdrop_path,
  poster_path,
  movieCount,
}: CollectionHeroProps) => {
  const router = useRouter();
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "/placeholder.png";

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder-movie.png";

  return (
    <div className="relative h-[80vh]">
      <Image
        src={backdropUrl}
        alt={name}
        fill
        priority
        className="object-cover brightness-[0.4]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

      {/* Back Button */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute top-8 left-8 z-50 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 size-6" />
        Back
      </Button>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-end">
          <div className="relative hidden md:block w-[300px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary shrink-0">
            <Image src={posterUrl} alt={name} fill className="object-cover" />
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                {name}
              </h1>
              <p className="text-xl leading-relaxed text-gray-200 max-w-3xl">
                {overview}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="font-bold">{movieCount}</span> Movies
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
