import Image from "next/image";
import { ImageType } from "./types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LazyImage from "../LazyImage";

interface ActorGalleryProps {
  images: ImageType[];
  title: string;
}

export const ActorGallery = ({ images, title }: ActorGalleryProps) => {
  if (!images || images.length === 0) return null;

  // Limit to 8 images for initial view
  const displayImages = images.slice(0, 12);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white px-1">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 md:gap-4">
        {displayImages.map((img, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <LazyImage
                  src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                  alt={`Gallery Image ${i + 1}`}
                  className="object-cover transition-opacity duration-300 hover:opacity-90"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] bg-black/90 text-white border-white/10 p-0 overflow-hidden">
              <DialogTitle className="hidden"></DialogTitle>
              <div className="relative h-[80vh] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                  alt={`Full Image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};
