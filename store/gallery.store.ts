import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GalleryStore {
  gallery: string;
  index: number;
  setGallery: (gallery: string) => void;
  setGalleryIndex: (index: number) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
}

export const useGalleryStore = create<GalleryStore>()(
  immer((set) => ({
    gallery: "",
    index: 0,
    setGallery: (gallery: string) =>
      set((state) => {
        state.gallery = gallery;
      }),
    setGalleryIndex: (index: number) =>
      set((state) => {
        state.index = index;
      }),
    incrementIndex: () =>
      set((state) => {
        state.index++;
      }),
    decrementIndex: () =>
      set((state) => {
        state.index--;
      }),
  }))
);
