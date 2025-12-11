import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GalleryStore {
  gallery: string;
  index: number;
  hasOpened: boolean;
  setGallery: (gallery: string) => void;
  setGalleryIndex: (index: number) => void;
  setHasOpened: (hasOpened: boolean) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
}

export const useGalleryStore = create<GalleryStore>()(
  immer((set) => ({
    gallery: "",
    index: 0,
    hasOpened: false,
    setGallery: (gallery: string) =>
      set((state) => {
        state.gallery = gallery;
      }),
    setHasOpened: (hasOpened: boolean) =>
      set((state) => {
        state.hasOpened = hasOpened;
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
