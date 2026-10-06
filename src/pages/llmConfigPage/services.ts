import request from "../../request";

const addLLMConfig = (params: { modalType: string; apiKey: string }) => {
  return request.post<{ message: string; code: string }>(
    "/llmConfig/addConfig",
    params
  );
};

const queryAllLLMConfig = () => {
  return request.get<{
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
