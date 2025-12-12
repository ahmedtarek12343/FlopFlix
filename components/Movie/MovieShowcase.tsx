"use client";

import { useGetMovieByID } from "@/hooks/useGetMovieByID";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, ArrowRight, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/types";
import ImageTrail from "../ImageTrail";
import { useGalleryStore } from "@/store/gallery.store";
import MovieCard from "./MovieCard";

import ReviewSection from "./ReviewSection";
import MovieGallery from "./MovieGallery";
import MovieVideos from "./MovieVideos";
import MovieCast from "./MovieCast";
import { useAddHistory } from "@/lib/mutations/useAddHistory";

const MovieShowcase = ({ id }: { id: number }) => {
  const { data: movie, isPending, isError } = useGetMovieByID(id);

  const {
    gallery,
    index,
    hasOpened,
    setGallery,
    incrementIndex,
    decrementIndex,
    setHasOpened,
  } = useGalleryStore();

  const { mutate: addHistory } = useAddHistory();

  useEffect(() => {
    if (!movie) return; // wait until movie is loaded
    addHistory({
      ...movie,
      contentId: id,
      type: "Movie",
      genres: movie?.genres?.map((g: any) => g.name),
    });
  }, []);

  useEffect(() => {
    if (movie?.images && hasOpened) {
      setGallery(
        `https://image.tmdb.org/t/p/original${movie.images.backdrops[index].file_path}`
      );
    }
  }, [index]);

  const [posterLoading, setPosterLoading] = useState(true);

  const router = useRouter();

  // Loading State
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mb-6" />
        <p className="text-2xl text-white/80 font-light">Loading Movie...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-950 to-black">
        <p className="text-3xl text-white font-bold">Failed to load movie</p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.png";

  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden relative">
      {gallery && (
        <>
          {/* Centered modal */}
          <div className="fixed inset-0 flex items-center justify-center z-60">
            <div className="relative max-w-7xl  w-[90%] z-55">
              {/* Image */}
              <Image
                src={gallery}
                alt={movie.title}
                width={500}
                height={750}
                priority
                className="rounded-2xl w-full md:aspect-auto aspect-[2/3] object-cover animate-zoomIn"
              />

              {/* Close button (positioned relative to the image container) */}
              <Button
                variant="ghost"
                onClick={() => {
                  setGallery("");
                  setHasOpened(false);
                }}
                className="absolute top-3 right-3 z-70"
              >
                <X className="size-6 text-white" />
              </Button>

              {/* Next and Previous buttons */}
              <Button
                onClick={() => decrementIndex()}
                disabled={index === 0}
                className="absolute top-1/2 left-3 z-70 transform -translate-y-1/2"
              >
                <ArrowLeft className="size-6 text-white" />
              </Button>
              <Button
                onClick={() => {
                  incrementIndex();
                }}
                disabled={index === 11}
                className="absolute top-1/2 right-3 z-70 transform -translate-y-1/2"
              >
                <ArrowRight className="size-6 text-white" />
              </Button>
            </div>
            <div
              onClick={() => {
                setGallery("");
                setHasOpened(false);
              }}
              className="fixed inset-0 z-52 bg-black/50 backdrop-blur-sm"
            ></div>
          </div>
        </>
      )}
      <div className="h-screen absolute inset-0 z-10 overflow-hidden">
        <ImageTrail
          key={movie.id}
          items={
            (movie?.images &&
              movie?.images.backdrops
                .slice(0, 6)
                .map(
                  (b: any) => `https://image.tmdb.org/t/p/w500${b.file_path}`
                )) ||
            []
          }
          variant={5}
        />
      </div>
      {/* Hero Backdrop */}
      {backdropUrl && (
        <div className="relative h-screen">
          {posterLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mb-6" />
            </div>
          )}
          <Image
            src={backdropUrl}
            alt={movie.title}
            onLoad={() => setPosterLoading(false)}
            fill
            priority
            className="object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-transparent" />
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
          <div className="absolute bottom-0 left-0 right-0 lg:p-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
              <div className="relative lg:block hidden aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover  hover:scale-105 transition-all duration-300"
                />
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-2xl md:text-3xl text-gray-300 italic font-light">
                      {movie.tagline}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <div className="flex items-center gap-6">
                    {movie.Ratings &&
                      movie.Ratings.map((rating: any) => (
                        <div
                          key={rating.Source}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={rating.Image}
                            alt={rating.Source}
                            width={24}
                            height={24}
                          />{" "}
                          {rating.Value}
                        </div>
                      ))}
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {movie.Rated || "N/A"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-lg px-4 py-2 border-white/50"
                  >
                    {movie.Year || "N/A"}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    <Clock className="size-4 mr-1" />
                    {movie.Runtime || "N/A"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3">
                  {movie.genres?.map((g: { id: number; name: string }) => (
                    <Badge
                      key={g.id}
                      className="bg-primary/70 border-primary text-white px-4 py-2"
                    >
                      {g.name.trim()}
                    </Badge>
                  ))}
                </div>

                <p className="text-xl leading-relaxed text-gray-200 max-w-4xl">
                  {movie.Plot}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <MovieCast fullMovie={movie} />
      {/* Reviews */}
      <ReviewSection fullMovie={movie} />
      {/* Gallery */}
      <MovieGallery fullMovie={movie} />
      {/* Videos */}
      <MovieVideos fullMovie={movie} />
      {/* Similar Movies */}
      <section className="py-20">
        <h2 className="text-3xl font-bold my-6">You may also like</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
          {movie?.similar &&
            movie?.similar.results
              .slice(0, 8)
              .map((movie: MovieType) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default MovieShowcase;
