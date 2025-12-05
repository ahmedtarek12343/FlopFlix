"use client";
import { useTvOptionsById } from "@/hooks/useTvOptionsById";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

const TvShowCase = ({ id }: { id: number }) => {
  const { data, isPending, isError } = useTvOptionsById(id);

  if (isPending)
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <Loader2Icon className="animate-spin size-12 text-primary" />
        <p>Loading TV Show...</p>
      </div>
    );
  if (isError) return <p>Error loading TV Show</p>;

  return (
    <div>
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.name}
          width={500}
          height={500}
        />
        <div>
          <h1>{data.name}</h1>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TvShowCase;
