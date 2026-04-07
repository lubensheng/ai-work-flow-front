import { create } from "zustand";
import { combine } from "zustand/middleware";
import { NODE_TYPE } from "../pages/createWorkFlow/constants";

type State = {
  [NODE_TYPE.AGENT_NODE]: number;
  [NODE_TYPE.START_NODE]: number;
  [NODE_TYPE.END_NODE]: number;
};

const initState = {
  [NODE_TYPE.AGENT_NODE]: 2,
  [NODE_TYPE.START_NODE]: 2,
  [NODE_TYPE.END_NODE]: 2,
};

type Action = {
  setNodeIdIndex: (type: NODE_TYPE) => void;
};

const useNodeIdInfo = create<State & Action>(
  combine(initState, (set) => ({
    setNodeIdIndex: (type: NODE_TYPE) => {
      set((state) => ({
        ...state,
        [type]: ++state[type],
      }));
    },
  }))
);

export default useNodeIdInfo;
