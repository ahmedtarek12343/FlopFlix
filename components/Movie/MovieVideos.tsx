import { MovieType } from "@/types/types";

const MovieVideos = ({ fullMovie }: { fullMovie: MovieType }) => {
  const videos = fullMovie?.videos?.results;
  const trailerKey = videos?.find((v: any) => v.type === "Trailer")?.key;
  return (
    <section className="py-20">
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
