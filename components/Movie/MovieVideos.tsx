import { useGetMovieVideosByID } from "@/hooks/useGetMovieByID";

const MovieVideos = ({ id }: { id: number }) => {
  const { data: videos } = useGetMovieVideosByID(id);
  const trailerKey = videos?.find((v: any) => v.type === "Trailer")?.key;
  return (
    <section>
      <h2 className="text-3xl font-bold my-6">Official Trailer</h2>
      <div className="">
        {videos && (
          <div key={trailerKey} className="overflow-hidden max-w-7xl mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieVideos;
