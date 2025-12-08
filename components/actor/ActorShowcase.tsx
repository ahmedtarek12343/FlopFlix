"use client";
import { useGetActor, useGetActorCredits } from "@/hooks/useGetActor";

const ActorShowcase = ({ id }: { id: string }) => {
  const { data: actor } = useGetActor(id);
  const { data: credits } = useGetActorCredits(id);

  return (
    <div>
      ActorShowcase {actor?.name}
      <img
        src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
        alt=""
      />
    </div>
  );
};

export default ActorShowcase;
