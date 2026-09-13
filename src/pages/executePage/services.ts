import type { CreateConversationReq, HistoryConversationInfo } from "./type";
import request from "../../request";

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

const getHistoryConversationInfByFlowId = (flowId: string) => {
  return request.post<{
    code: number;
    message: string;
    data: HistoryConversationInfo[];
  }>("/flowExecute/getHistoryConversationInfByFlowId/" + flowId);
};

export { queryFlowInfo, createConversation, getHistoryConversationInfByFlowId };
