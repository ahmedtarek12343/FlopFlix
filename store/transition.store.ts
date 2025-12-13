import { create } from "zustand";

interface TransitionStore {
  expandingCard: {
    id: number;
    src: string;
    initialPosition: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
  } | null;
  setExpandingCard: (card: any) => void;
  clearExpandingCard: () => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  expandingCard: null,
  setExpandingCard: (card) => set({ expandingCard: card }),
  clearExpandingCard: () => set({ expandingCard: null }),
}));
