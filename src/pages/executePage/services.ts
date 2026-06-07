import axios from "axios";

const queryFlowInfo = (flowConfigId: string) => {
  return axios.post<{ code: number; message: string }>(
    "/flow/queryFlowConfigInfo/" + flowConfigId
  );
};

export default queryFlowInfo;
