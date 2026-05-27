import { create } from "zustand";
import { combine } from "zustand/middleware";
const useClickEdgeId = create<{
  currentId: string;
  setCurrentId: (id: string) => void;
  clearCurrentId: () => void;
}>(
  combine({ currentId: "" }, (set) => {
    return {
      setCurrentId: (id: string) => {
        set(() => ({
          currentId: id,
        }));
      },
      clearCurrentId() {
        set({ currentId: '' })
      }
    };
  })
);

export { useClickEdgeId };
