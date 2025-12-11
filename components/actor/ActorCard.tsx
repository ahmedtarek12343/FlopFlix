import Link from "next/link";
import LazyImage from "../LazyImage";
import { User } from "lucide-react";

interface ActorCardProps {
  actor: {
    id: number;
    name: string;
    profile_path: string | null;
    known_for?: {
      title?: string;
      name?: string;
    }[];
  };
}

const ActorCard = ({ actor }: ActorCardProps) => {
  return (
    <Link
      href={`/actors/${actor.id}`}
      className="group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-gray-900 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
        <LazyImage
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "/placeholder.png"
          }
          alt={actor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-3">
        <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-primary">
          {actor.name}
        </h3>
        {actor.known_for && actor.known_for.length > 0 && (
          <p className="line-clamp-1 text-xs text-gray-400 mt-1">
            Known for:{" "}
            {actor.known_for.map((k) => k.title || k.name).join(", ")}
          </p>
        )}
        {!actor.known_for && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <User size={12} />
            <span>Actor</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ActorCard;
