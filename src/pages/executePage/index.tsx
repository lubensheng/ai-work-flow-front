import { useLocation } from "react-router";
import LeftConversationInfo from "./leftConversationInfo";
import RightContent from "./rightContent";
import { useEffect, useState } from "react";
import { getUrlParams } from "../../utils";
import { message, Spin } from "antd";
import { createConversation, queryFlowInfo } from "./services";
import { SUCCESS_CODE } from "../../utils/constants";
import type { ConversationItem } from "./type";
import { CONVERSATION_ID_PREFIX } from "./constant";

type PageOperationType = "history" | "new";

function ExecutePage() {
  const location = useLocation();
  const [flowInfo, setFlowInfo] = useState<{
    appName: string;
    flowId: string;
    type: PageOperationType;
  }>({
    appName: "",
    flowId: "",
    type: "new",
  });
  const [currentSelectConversationId, setCurrentSelectConversationId] =
    useState<string>(CONVERSATION_ID_PREFIX + 1);
  const [conversationList, setConversationList] = useState<ConversationItem[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const getFlowInfo = async (flowConfigId: string, type: PageOperationType) => {
    setLoading(true);
    const res = await queryFlowInfo(flowConfigId);
    console.log(res);
    if (type === "new") {
      const conversationId = await createConversation({
        flowId: flowInfo.flowId,
      });
      setLoading(false);
      setConversationList([
        {
          converStationId: conversationId.data.data,
          id: CONVERSATION_ID_PREFIX + 1,
          contentList: [],
          askList: [],
        },
      ]);
      if (res.data.code !== SUCCESS_CODE) {
        message.error(res.data.message);
        return;
      }
    } else {
      const conversationId = await createConversation({
        flowId: flowInfo.flowId,
      });
      setLoading(false);
      setConversationList([
        {
          converStationId: conversationId.data.data,
          id: CONVERSATION_ID_PREFIX + 1,
          contentList: [],
          askList: [],
        },
      ]);
      if (res.data.code !== SUCCESS_CODE) {
        message.error(res.data.message);
        return;
      }
    }
  };
  useEffect(() => {
    console.log(location.search);
    const params = getUrlParams(location.search);
    console.log(params);
    setFlowInfo({
      appName: params["appName"] as string,
      flowId: params["flowId"] as string,
      type: (params["type"] as PageOperationType) || "new",
    });
    getFlowInfo(
      params["flowConfigId"] as string,
      (params["type"] as PageOperationType) || "new",
    );
  }, [location.search]);

  const handleAddConversation = async () => {
    const conversationId = await createConversation({
      flowId: flowInfo.flowId,
    });
    console.log(conversationId);
    setConversationList((pre) => [
      ...pre,
      {
        converStationId: conversationId.data.data,
        id: CONVERSATION_ID_PREFIX + pre.length + 1,
        contentList: [],
        askList: [],
      },
    ]);
  };

  const updateCurrentSelectCurrentConversationId = (id: string) => {
    setCurrentSelectConversationId(id);
  };

  return (
    <Spin spinning={loading}>
      <div
        className="flex"
        style={{ height: "calc(100vh - 57px)", padding: "16px" }}>
        <LeftConversationInfo
          appName={flowInfo.appName}
          conversationList={conversationList}
          addConversationList={handleAddConversation}
          selectConversationId={currentSelectConversationId}
          updateCurrentSelectCurrentConversationId={
            updateCurrentSelectCurrentConversationId
          }
        />
        <RightContent flowId={flowInfo.flowId} />
      </div>
    </Spin>
  );
}

export default ExecutePage;
