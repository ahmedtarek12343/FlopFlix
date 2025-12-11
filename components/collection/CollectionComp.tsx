"use client";
import { useGetCollection } from "@/hooks/useGetCollection";
import { CollectionHero } from "./CollectionHero";
import { CollectionGrid } from "./CollectionGrid";

export const CollectionComp = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetCollection(Number(id));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mb-6" />
        <p className="text-2xl text-white/80 font-light">
          Loading Collection...
        </p>
      </div>
    );
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
