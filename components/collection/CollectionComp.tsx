"use client";
import { useGetCollection } from "@/hooks/useGetCollection";
import { CollectionHero } from "./CollectionHero";
import { CollectionGrid } from "./CollectionGrid";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";

export const CollectionComp = ({ id }: { id: string }) => {
  const { data, isPending, error, refetch } = useGetCollection(Number(id));

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorFallback refetch={refetch} />;
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-950 to-black">
        <p className="text-3xl text-white font-bold">
          Failed to load collection
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden relative">
      <CollectionHero
        name={data.name}
        overview={data.overview}
        backdrop_path={data.backdrop_path}
        poster_path={data.poster_path}
        movieCount={data.parts?.length || 0}
      />
      <CollectionGrid movies={data.parts || []} />
    </div>
  );
};
