import { useLocation } from "react-router";
import LeftConversationInfo from "./leftConversationInfo";
import RightContent from "./rightContent";
import { useEffect, useState } from "react";
import { getUrlParams } from "../../utils";
import { message, Spin } from "antd";
import queryFlowInfo from "./services";
import { SUCCESS_CODE } from "../../utils/constants";
import type { ConversationItem } from "./type";
import { CONVERSATION_ID_PREFIX } from "./constant";

function ExecutePage() {
  const location = useLocation();
  const [flowInfo, setFlowInfo] = useState<{ appName: string; flowId: string }>(
    {
      appName: "",
      flowId: "",
    }
  );
  const [currentSelectConversationId, setCurrentSelectConversationId] =
    useState<string>(CONVERSATION_ID_PREFIX + 1);
  const [conversationList, setConversationList] = useState<ConversationItem[]>([
    {
      id: CONVERSATION_ID_PREFIX + 1,
      contentList: [],
      askList: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const getFlowInfo = async (flowConfigId: string) => {
    setLoading(true);
    const res = await queryFlowInfo(flowConfigId);
    setLoading(false);
    console.log(res);
    if (res.data.code !== SUCCESS_CODE) {
      message.error(res.data.message);
      return;
    }
  };
  useEffect(() => {
    console.log(location.search);
    const params = getUrlParams(location.search);
    console.log(params);
    setFlowInfo({
      appName: params["appName"] as string,
      flowId: params["flowId"] as string,
    });
    getFlowInfo(params["flowConfigId"] as string);
  }, [location.search]);

  const handleAddConversation = () => {
    setConversationList((pre) => [
      ...pre,
      {
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
        style={{ height: "calc(100vh - 57px)", padding: "16px" }}
      >
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
