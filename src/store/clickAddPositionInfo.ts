import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
  currentAddNodeInfo: {
    position?: { x: number; y: number };
    nodeInfo?: {
      id: string;
    };
    edgeInfo?: {
      source: string;
      target: string;
      edgeId: string;
    };
  };
};

type Action = {
  setCurrentNodeInfo: (state: State) => void;
};

const useClickAddPositionInfo = create<State & Action>(
  combine({ currentAddNodeInfo: {} }, (set) => {
    return {
      setCurrentNodeInfo: (currentAddNodeInfo: State) => {
        set(currentAddNodeInfo);
      },
    };
  })
);

export default useClickAddPositionInfo;
