import Image from "next/image";
import { useGalleryStore } from "@/store/gallery.store";
import { useFiltersStore } from "@/store/filters.store";
import { MovieType } from "@/types/types";
import { motion } from "framer-motion";

interface Image {
  file_path: string;
}

const MovieGallery = ({ fullMovie }: { fullMovie: MovieType }) => {
  const { filters } = useFiltersStore();
  const { setGallery, setGalleryIndex, setHasOpened } = useGalleryStore();

  // Normalize the images array
  const images =
    filters.type === "movie" ? fullMovie.images.backdrops || [] : [];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-6">Gallery</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.slice(0, 12).map((image: Image, i: number) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={image.file_path}
            className="overflow-hidden"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              alt={image.file_path}
              onClick={() => {
                setGalleryIndex(i);
                setHasOpened(true);
                setGallery(
                  `https://image.tmdb.org/t/p/original${image.file_path}`
                );
              }}
              width={500}
              height={750}
              className="w-full h-full rounded-2xl hover:scale-110 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MovieGallery;
