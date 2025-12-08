import LazyImage from "../LazyImage";
import { useGetMovieImagesByID } from "@/hooks/useGetMovieByID";
import { useGalleryStore } from "@/store/gallery.store";

const MovieGallery = ({ id }: { id: number }) => {
  const { data: images } = useGetMovieImagesByID(id);
  const { index, setGallery, setGalleryIndex } = useGalleryStore();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Gallery</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {images &&
          images.backdrops
            .slice(0, 12)
            .map((image: { id: number; file_path: string }) => (
              <div key={image.file_path} className="overflow-hidden">
                <LazyImage
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={image.file_path}
                  onClick={() => {
                    const newIndex = images.backdrops.indexOf(image);
                    setGalleryIndex(newIndex);
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
