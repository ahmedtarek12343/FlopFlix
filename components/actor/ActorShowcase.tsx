"use client";

import { useGetActor } from "@/hooks/useGetActor";
import { ActorHero } from "./ActorHero";
import { ActorCredits } from "./ActorCredits";
import { ActorGallery } from "./ActorGallery";
import { Actor } from "./types";
import ErrorFallback from "../ErrorFallback";
import LoadingSpinner from "../LoadingSpinner";

const ActorShowcase = ({ id }: { id: string }) => {
  const { data, isPending, isError, refetch } = useGetActor(id);

  const actor = data as unknown as Actor;

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorFallback refetch={refetch} />;
  }

  if (!actor) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Actor Not Found</h1>
        <p className="text-muted-foreground">
          We couldn't find the actor you requested.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pb-32 space-y-12">
      <ActorHero actor={actor} />

      <div className="container mx-auto px-4 space-y-16">
        {actor.movie_credits?.cast && (
          <ActorCredits
            title="Known For"
            items={actor.movie_credits.cast}
            type="movie"
          />
        )}

        {actor.tv_credits?.cast?.length > 0 && (
          <ActorCredits
            title="TV Shows"
            items={actor.tv_credits.cast}
            type="tv"
          />
        )}

        {actor.images?.profiles && (
          <ActorGallery title="Photos" images={actor.images.profiles} />
        )}

        {actor.tagged_images?.results &&
          actor.tagged_images.results.length > 0 && (
            <ActorGallery
              title="Tagged Images"
              images={actor.tagged_images.results}
            />
          )}
      </div>
    </div>
  );
};

export default ActorShowcase;
