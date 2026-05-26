import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
  currentLLMConfig: { modalType: string; apiKey: string; id: number }[];
};

type Action = {
  getCurrentLLMConfig: () => {
    modalType: string;
    apiKey: string;
    id: number;
  }[];
  setCurrentLLMConfig: (
    value: { modalType: string; apiKey: string; id: number }[]
  ) => void;
};

const useLLMConfig = create<State & Action>(
  combine(
    {
      currentLLMConfig: [] as {
        modalType: string;
        apiKey: string;
        id: number;
      }[],
    },
    (set, get) => ({
      getCurrentLLMConfig: () => {
        const { currentLLMConfig } = get();
        return currentLLMConfig;
      },
      setCurrentLLMConfig(value) {
        set({ currentLLMConfig: value });
      },
    })
  )
);

export default useLLMConfig;
