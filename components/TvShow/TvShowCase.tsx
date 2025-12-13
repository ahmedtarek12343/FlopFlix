"use client";

import { useTvOptionsById } from "@/hooks/useTvOptionsById";
import { Loader2Icon, ArrowLeft, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useGalleryStore } from "@/store/gallery.store";
import { useEffect } from "react";
import TvPoster from "./TvPoster";
import TvSeasons from "./TvSeasons";
import TvCard from "./TvCard";
import ReviewSection from "../Movie/ReviewSection";
import { TvWithExtras } from "@/types/types";
import { useAddHistory } from "@/lib/mutations/useAddHistory";

const TvShowCase = ({ id }: { id: number }) => {
  const { data: show, isPending, isError } = useTvOptionsById(id);
  const { mutate: addToHistory } = useAddHistory();

  const {
    index,
    gallery,
    hasOpened,
    setGallery,
    setGalleryIndex,
    incrementIndex,
    setHasOpened,
    decrementIndex,
  } = useGalleryStore();

  useEffect(() => {
    if (!show) return;
    addToHistory({
      type: "TV",
      contentId: id,
      title: show?.name,
      backdrop_path: show?.backdrop_path,
      release_date: show?.first_air_date,
      vote_average: show?.vote_average,
      overview: show?.overview,
      genres: show?.genres?.map((g: any) => g.name),
    });
  }, []);

  useEffect(() => {
    if (show && show.images && hasOpened) {
      setGallery(
        `https://image.tmdb.org/t/p/original${show.images.backdrops[index].file_path}`
      );
    }
  }, [index]);
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

  const trailerKey = show.videos?.results?.find(
    (v: any) => v.type === "Trailer"
  )?.key;

  return (
    <div className="min-h-screen relative bg-background text-white">
      {gallery && (
        <>
          {/* Centered modal */}
          <div className="fixed inset-0 flex items-center justify-center z-60">
            <div className="relative max-w-7xl  w-[90%] z-55">
              {/* Image */}
              <Image
                src={gallery}
                alt={show.name}
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

      <TvPoster show={show} />
      {show.seasons.length > 0 && <TvSeasons show={show} />}

      {/* Images */}

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
      <ReviewSection fullMovie={show} />

      {/* Similar Movies */}
      <section>
        <h2 className="text-3xl font-bold my-6">Similar Shows</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
          {show.similar.results &&
            show.similar.results
              .slice(0, 8)
              .map((show: TvWithExtras) => (
                <TvCard show={show} key={show.id} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default TvShowCase;
