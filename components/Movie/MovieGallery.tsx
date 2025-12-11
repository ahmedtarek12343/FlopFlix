import LazyImage from "../LazyImage";
import { useGalleryStore } from "@/store/gallery.store";
import { useFiltersStore } from "@/store/filters.store";
import { MovieType } from "@/types/types";

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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {images.slice(0, 12).map((image: Image, i: number) => (
          <div key={image.file_path} className="overflow-hidden">
            <LazyImage
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              alt={image.file_path}
              onClick={() => {
                setGalleryIndex(i);
                setHasOpened(true);
                setGallery(
                  `https://image.tmdb.org/t/p/original${image.file_path}`
                );
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGallery;
