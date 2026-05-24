import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
  currentLLMConfig: { apiType: string; apiKey: string }[];
};

type Action = {
  getCurrentLLMConfig: () => { apiType: string; apiKey: string }[];
  setCurrentLLMConfig: (value: { apiType: string; apiKey: string }[]) => void;
};

const useLLMConfig = create<State & Action>(
  combine(
    { currentLLMConfig: [] as { apiType: string; apiKey: string }[] },
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
