import { MovieType } from "@/types/types";
import { motion } from "framer-motion";

const MovieVideos = ({ fullMovie }: { fullMovie: MovieType }) => {
  const videos = fullMovie?.videos?.results;
  const trailerKey = videos?.find((v: any) => v.type === "Trailer")?.key;
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold my-6">Official Trailer</h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", delay: 0.8 }}
        className=""
      >
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
      </motion.div>
    </section>
  );
};

export default MovieVideos;
