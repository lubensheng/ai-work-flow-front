import axios from "axios";

const addLLMConfig = (params: { modalType: string; apiKey: string }) => {
  return axios.post<{ message: string; code: string }>(
    "/llmConfig/addConfig",
    params
  );
};

const queryAllLLMConfig = () => {
  return axios.get<{
    message: string;
    code: string;
    data: {
      modalType: string;
      apiKey: string;
      id: number;
    }[];
  }>("/llmConfig/queryAll");
};

export { addLLMConfig, queryAllLLMConfig };
