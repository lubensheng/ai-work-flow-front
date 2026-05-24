import axios from "axios";

const addLLMConfig = (params: { modalType: string; apiKey: string }) => {
  return axios.post<{ message: string; code: string }>("/llm/config", params);
};

const queryAllLLMConfig = () => {
  return axios.post("/llm/queryAll");
};

export { addLLMConfig, queryAllLLMConfig };
