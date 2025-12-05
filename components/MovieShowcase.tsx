"use client";
import { useGetMovieByID } from "@/hooks/useGetMovieByID";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import PixelTransition from "../components/PixelTransition";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { Video } from "@/types/types";
import { Loader2Icon } from "lucide-react";

const MovieShowcase = ({ id }: { id: number }) => {
  const { data, isPending, isError } = useGetMovieByID(id);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  if (isPending)
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <Loader2Icon className="animate-spin size-12 text-primary" />
        <p>Loading Movie...</p>
      </div>
    );
  if (isError) return <p>Error loading movie</p>;

  const src = data.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : "/placeholder.png";

  return (
    <div className="relative" id="movie-showcase">
      <div className="flex gap-5 items-start">
        <div className="flex-1">
          <Button
            variant="link"
            className="cursor-pointer text-lg"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-12 h-12" />
            Back
          </Button>
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold tracking-tight">
              {data.title}
            </h2>
            <div className="flex gap-2">
              {data.Genre.split(",").map((genre: string, index: number) => (
                <span
                  key={index}
                  className="py-2 px-5 rounded-2xl text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-8 py-5">
              {data.Ratings.map((rating: any, index: number) => (
                <div key={index} className="flex flex-col gap-2">
                  <img
                    src={rating.Image}
                    alt={rating.Source}
                    className="h-8 object-cover"
                  />{" "}
                  <p>{rating.Value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <Badge>{data.Rated}</Badge>
              <Badge>{data.Year}</Badge>
              <Badge>{data.Language}</Badge>
            </div>

            <p className="text-lg max-w-3xl text-gray-200">{data.Plot}</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-12 text-gray-300">
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Box Office
                </p>
                <p className="text-lg">{data.BoxOffice}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Awards</p>
                <p className="text-lg">{data.Awards}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Production
                </p>
                <p className="text-lg">
                  {data.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Director</p>
                <p className="text-lg">{data.Director}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Writer</p>
                <p className="text-lg">{data.Writer}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Actors</p>
                <p className="text-lg">{data.Actors}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Genre</p>
                <p className="text-lg">{data.Genre}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Language</p>
                <p className="text-lg">{data.Language}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Runtime</p>
                <p className="text-lg">{data.Runtime}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Type</p>
                <p className="text-lg">{data.Type}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Budget</p>
                <p className="text-lg">${data.budget?.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Revenue</p>
                <p className="text-lg">${data.revenue?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 self-start lg:block hidden">
          {loading && <Skeleton className="absolute w-full h-full inset-0" />}
          <PixelTransition
            firstContent={
              <Image
                src={src}
                alt={data.title}
                loading="lazy"
                width={500}
                height={500}
                className={cn(
                  "object-cover basis-1/3 rounded-2xl h-full transition-opacity duration-300",
                  loading ? "opacity-0" : "opacity-100"
                )}
                onLoadingComplete={() => setLoading(false)}
              />
            }
            secondContent={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#ffffff",
                    textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    textAlign: "center",
                  }}
                >
                  {data.title}
                </p>
              </div>
            }
            gridSize={12}
            pixelColor="#ffffff"
            once={false}
            animationStepDuration={0.4}
            className="custom-pixel-card"
          />
        </div>
      </div>
      <div className="mt-25 max-w-7xl mx-auto">
        {data.videos.find((video: Video) => video.type === "Trailer")?.key ? (
          <iframe
            width="100%"
            height="600px"
            src={`https://www.youtube.com/embed/${
              data.videos.find((video: Video) => video.type === "Trailer")?.key
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : null}
      </div>
    </div>
  );
};

export default MovieShowcase;
