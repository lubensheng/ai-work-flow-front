import type { CreateConversationReq, HistoryConversationInfo } from "./type";
import request from "../../request";
import type { HttpResult } from "../../utils/constants";

const queryFlowInfo = (flowConfigId: string) => {
  return request.post<{ code: number; message: string }>(
    "/flow/queryFlowConfigInfo/" + flowConfigId,
  );
};

const createConversation = (req: CreateConversationReq) => {
  return request.post<{ code: number; message: string; data: string }>(
    "/flowExecute/createConversationId",
    req,
  );
};


const queryHistoryConversationList = (flowId: string) => {
  return request.post<HttpResult<HistoryConversationInfo[]>>("/flowExecute/getHistoryConversationInfByFlowId" + flowId);
}

export { queryFlowInfo, createConversation, queryHistoryConversationList };
