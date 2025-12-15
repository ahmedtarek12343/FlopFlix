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
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";

const MovieShowcase = ({ id }: { id: number }) => {
  const { data: movie, isPending, isError, refetch } = useGetMovieByID(id);

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
    return <LoadingSpinner />;
  }

  if (isError || !movie) {
    return <ErrorFallback refetch={refetch} />;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.png";
  const MotionImage = motion(Image);

  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden relative">
      {gallery && (
        <>
          {/* Centered modal */}
          <div className="fixed inset-0 flex items-center justify-center z-60">
            <div className="relative max-w-7xl w-[90%] z-55">
              {/* Image */}
              <MotionImage
                src={gallery}
                alt={movie.title}
                transition={{ duration: 2 }}
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
              <button
                onClick={() => decrementIndex()}
                disabled={index === 0}
                className="absolute disabled:opacity-50 hover:scale-110 transition-all top-1/2 left-5 z-70 transform -translate-y-1/2"
              >
                <ArrowLeft className="size-6 text-white" />
              </button>
              <button
                onClick={() => {
                  incrementIndex();
                }}
                disabled={index === 11}
                className="absolute disabled:opacity-50 hover:scale-110 transition-all top-1/2 right-5 z-70 transform -translate-y-1/2"
              >
                <ArrowRight className="size-6 text-white" />
              </button>
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
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative lg:block hidden aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary"
              >
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover  hover:scale-105 transition-all duration-300"
                />
              </motion.div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <motion.h1 className="text-2xl flex md:text-4xl font-black tracking-wide mb-2">
                    {movie.title
                      .split("")
                      .map((char: string, index: number) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: -70 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            delay: index * 0.065,
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.p>
                      ))}
                  </motion.h1>
                  {movie.tagline && (
                    <p className="text-2xl flex md:text-3xl text-gray-300 italic font-light">
                      {movie.tagline
                        .split("")
                        .map((char: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut",
                              delay: index * 0.09,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <motion.div className="flex items-center gap-6">
                    {movie.Ratings &&
                      movie.Ratings.map((rating: any, index: number) => (
                        <motion.div
                          key={rating.Source}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            delay: index * 0.3,
                          }}
                        >
                          <Image
                            src={rating.Image}
                            alt={rating.Source}
                            width={24}
                            height={24}
                          />{" "}
                          {rating.Value}
                        </motion.div>
                      ))}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="flex items-center gap-4"
                  >
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
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {movie.genres?.map(
                    (g: { id: number; name: string }, index: number) => (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                        key={g.id}
                      >
                        <Badge className="bg-primary/70 border-primary text-white px-4 py-2">
                          {g.name.trim()}
                        </Badge>
                      </motion.div>
                    )
                  )}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="text-xl leading-relaxed text-gray-200 max-w-4xl"
                >
                  {movie.Plot}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 py-20 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MovieCast fullMovie={movie} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ReviewSection fullMovie={movie} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MovieGallery fullMovie={movie} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MovieVideos fullMovie={movie} />
        </motion.div>

        {/* Similar Movies */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <span className="w-1 h-8 bg-primary rounded-full" />
            You may also like
          </motion.h2>
          <motion.div
            key={movie.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {movie?.similar &&
              movie?.similar.results.slice(0, 9).map((movie: MovieType) => (
                <motion.div
                  key={movie.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                      },
                    },
                  }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default MovieShowcase;
