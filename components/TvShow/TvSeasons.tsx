import Image from "next/image";
import Link from "next/link";
import { tvSeason, TvWithExtras } from "@/types/types";

const TvSeasons = ({ show }: { show: TvWithExtras }) => {
  return (
    <section className="px-15 py-10">
      <h2 className="text-3xl font-bold mb-8">Seasons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {show.seasons.map((season: tvSeason) => (
          <Link
            href={`/tv/${show.id}/season/${season.season_number}`}
            key={season.id}
            className="backdrop-blur border rounded-xl p-4 flex justify-between items-center hover:border-primary transition-all"
          >
            <div className="">
              <p className="text-sm text-gray-500">
                Season {season.season_number}
              </p>
              <p className="font-semibold">{season.name}</p>
            </div>{" "}
            <div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                alt={season.name}
                width={200}
                height={200}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TvSeasons;
