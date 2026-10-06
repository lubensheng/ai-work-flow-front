import request from '../../request';

export type ResultFlowInfo = {
  "id": number,
  "userId": number,
  "userName": string,
  "appName": string,
  "appType": string,
  "appDesc": string,
  "flowConfigId": string,
  "flowStatus": string,
  "createTime": string,
  "updateTime": string
}

export const queryFlowInfo = (params: { pageIndex: number, pageSize: number, userName: string }) => {
  return request.post<{ code: number, message: string, data: {
    total: number,
    resultData: ResultFlowInfo[]
  } }>('/flow/queryFlowInfo', params)
}

