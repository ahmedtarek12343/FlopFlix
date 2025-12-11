import TvSeasonDetails from "@/components/TvShow/TvSeasonDetails";

const page = async ({
  params,
}: {
  params: { id: string; seasonNumber: string };
}) => {
  const { id, seasonNumber } = await params;
  return (
    <div>
      <TvSeasonDetails id={id} seasonNumber={seasonNumber} />
    </div>
  );
};

export default page;
