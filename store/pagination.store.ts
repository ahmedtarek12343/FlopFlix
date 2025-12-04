import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PaginationStore {
  pageNum: number;
  setPageNum: (pageNum: number) => void;
  incrementPageNum: () => void;
  decrementPageNum: () => void;
}

export const usePaginationStore = create<PaginationStore>()(
  immer((set) => ({
    pageNum: 1,
    setPageNum: (pageNewNum: number) =>
      set((state) => {
        state.pageNum = pageNewNum;
      }),
    incrementPageNum: () =>
      set((state) => {
        state.pageNum++;
      }),
    decrementPageNum: () =>
      set((state) => {
        state.pageNum--;
      }),
  }))
);
