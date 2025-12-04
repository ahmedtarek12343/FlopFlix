"use client";
import { useGetMovieByID } from "@/hooks/useGetMovieByID";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const MovieShowcase = ({ id }: { id: number }) => {
  const { data, isPending, isError } = useGetMovieByID(id);
  console.log(data);

  const router = useRouter();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error loading movie</p>;

  return (
    <div>
      <div>
        <Button
          variant="link"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <Image
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title}
        width={500}
        height={500}
      />
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p className="text-sm text-gray-500">{data.overview}</p>
    </div>
  );
};

export default MovieShowcase;
