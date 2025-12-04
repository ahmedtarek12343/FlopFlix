import MovieShowcase from "@/components/MovieShowcase";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <MovieShowcase id={Number(id)} />
    </div>
  );
};

export default page;
