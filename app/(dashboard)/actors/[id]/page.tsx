import ActorShowcase from "@/components/actor/ActorShowcase";

const ActorPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <ActorShowcase id={id} />
    </div>
  );
};

export default ActorPage;
