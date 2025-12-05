import TvShowCase from "@/components/TvShowCase";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <TvShowCase id={Number(id)} />
    </div>
  );
};

export default page;
