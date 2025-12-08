const page = async ({
  params,
}: {
  params: { id: string; seasonNumber: string };
}) => {
  const { id, seasonNumber } = await params;
  return (
    <div>
      page {id} {seasonNumber}
    </div>
  );
};

export default page;
