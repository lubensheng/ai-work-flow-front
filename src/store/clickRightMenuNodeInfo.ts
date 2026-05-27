import { create } from "zustand";
import type { NodeItem } from "./nodeList";
import { combine } from "zustand/middleware";

type State = {
  position?: { x: number; y: number };
  nodeInfo?: NodeItem;
};

type Action = {
  clearState: () => void;
  setStateInfo: (value: State) => void;
};

const useClickRightMenuNodeInfo = create<State & Action>(
  combine({}, (set) => ({
    clearState() {
      set({ position: undefined, nodeInfo: undefined });
    },
    setStateInfo(value) {
      set({ ...value });
    },
  })),
);

export default useClickRightMenuNodeInfo;
