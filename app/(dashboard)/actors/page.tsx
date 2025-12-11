import PopularActors from "@/components/actor/PopularActors";

const ActorPage = () => {
  return (
    <div>
      <div className="pb-7">
        <h2 className="text-2xl font-bold">Popular Actors</h2>{" "}
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary mt-1 rounded-full"></div>
        <p className="text-sm text-muted-foreground mt-1">
          Trending actors everyone is talking about right now.
        </p>{" "}
      </div>
      <PopularActors />
    </div>
  );
};

export default ActorPage;
