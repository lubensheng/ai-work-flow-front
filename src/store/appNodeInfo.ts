import { create } from "zustand";
import { combine } from "zustand/middleware";

export type AppNodeItem = {
  appType: "workFlow" | "dialogue";
  appName: string;
  appDesc?: string;
};

type State = {
  appNodeInfo?: AppNodeItem;
};

type Action = {
  setAppNodeInfo: (app: AppNodeItem) => void;
};

const useAppNodeIdInfo = create<State & Action>(
  combine({}, (set) => ({
    setAppNodeInfo(app) {
      set({
        appNodeInfo: app,
      });
    },
  }))
);

export default useAppNodeIdInfo;
