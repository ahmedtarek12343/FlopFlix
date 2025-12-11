import { CollectionComp } from "@/components/collection/CollectionComp";

const CollectionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <CollectionComp id={id} />
    </div>
  );
};

export default CollectionPage;
