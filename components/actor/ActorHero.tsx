import Image from "next/image";
import { Actor } from "./types";
import { ActorSocials } from "./ActorSocials";
import { ActorBio } from "./ActorBio";
import { MapPin, User, Cake } from "lucide-react";

interface ActorHeroProps {
  actor: Actor;
}

export const ActorHero = ({ actor }: ActorHeroProps) => {
  const backdrop =
    actor.tagged_images?.results?.[0]?.file_path || actor.profile_path;
  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
    : "/placeholder.png";

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gray-900/50 border border-white/5">
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-12 items-start">
        {/* Profile Image */}
        <div className="md:flex hidden relative group">
          <Image
            src={profileUrl}
            alt={actor.name}
            width={400}
            height={600}
            className="relative rounded-2xl object-cover shadow-2xl transition duration-500 group-hover:scale-[1.01]"
            priority
          />
        </div>

        {/* Info */}
        <div className="space-y-6 pt-2 w-full">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
              {actor.name}
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium mt-2 flex items-center justify-center md:justify-start gap-2">
              <User size={18} /> {actor.known_for_department}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {actor.birthday && (
              <div className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
                <Cake className="text-primary" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Born</p>
                  <p className="font-medium text-white">{actor.birthday}</p>
                </div>
              </div>
            )}

            {actor.place_of_birth && (
              <div className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
                <MapPin className="text-primary" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Place of Birth</p>
                  <p className="font-medium text-white">
                    {actor.place_of_birth}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
              <User className="text-primary" size={20} />
              <div>
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-medium text-white">{actor.gender}</p>
              </div>
            </div>
          </div>

          <ActorBio biography={actor.biography} />

          <ActorSocials
            externalIds={actor.external_ids}
            homepage={actor.homepage}
          />
        </div>
      </div>
    </div>
  );
};
