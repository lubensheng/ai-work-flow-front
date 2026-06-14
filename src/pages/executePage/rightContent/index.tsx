import { Input, message, Tooltip } from "antd";
import sendMsg from "../../../assets/sendMsg.svg";
import classNames from "classnames";
import styles from "./index.module.less";
import { useEffect, useRef, useState } from "react";
import Content from "./content";
import UserAskContent from "./userAskContent";

interface ViewProps {
  flowId: string;
}

function RightContent(props: ViewProps) {
  const { flowId } = props;
  const [inputValue, setInputValue] = useState<string>();
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contentList, setContentList] = useState<
    { conversationId: string; content: string; isFinish: boolean }[]
  >([]);
  const [userAskList, setUserAskList] = useState<
    { askId: string; relateConversationId: string; content: string }[]
  >([]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contentList]);

  const connectSSE = (id: string, content: string) => {
    // 关闭已有连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // 接口地址，对应 Nest 后端
    const sseUrl = `/flowExecute/executeFlow/${flowId}?content=${content}`;
    const es = new EventSource(sseUrl);
    eventSourceRef.current = es;

    // 接收消息
    es.onmessage = (e) => {
      // 后端返回结束标记，标记流完成
      if (e.data.includes("[结束]")) {
        setContentList((pre) => {
          if (pre.find((item) => item.conversationId === id)) {
            return pre.map((item) => {
              return {
                ...item,
                isFinish: true,
              };
            });
          }
          return [...pre, { conversationId: id, content: "", isFinish: true }];
        });
        es.close();
        return;
      }
      setContentList((pre) => {
        if (pre.find((item) => item.conversationId === id)) {
          return pre.map((item) => {
            return {
              ...item,
              isFinish: item.conversationId === id ? false : item.isFinish,
              content:
                item.conversationId === id
                  ? item.content + e.data
                  : item.content,
            };
          });
        }
        return [
          ...pre,
          { conversationId: id, content: e.data, isFinish: false },
        ];
      });
      // setContent(prev => [...prev, e.data]);
    };

    // 连接出错
    es.onerror = (err) => {
      console.error("SSE 连接异常", err);
      es.close();
    };
  };

  const sendMsgData = () => {
    if (!flowId) {
      message.warning("该流程id缺少");
      return;
    }
    if (!inputValue) {
      message.warning("请输入内容");
      return;
    }
    const newUserAskItem = {
      askId: "askId-" + (userAskList.length + 1),
      relateConversationId: "conversationId-" + (contentList.length + 1),
      content: inputValue || "",
    };
    setUserAskList((pre) => [...pre, newUserAskItem]);
    connectSSE("conversationId-" + (contentList.length + 1), inputValue);
    setTimeout(scrollToBottom, 0);
  };

  console.log(contentList);
  return (
    <div className={classNames("w-[70%]", "flex-1")}>
      <div className={styles["content-container"]} ref={messagesEndRef}>
        {contentList.map((item) => {
          const userAskContent = userAskList.find(
            (i) => i.relateConversationId === item.conversationId,
          );
          return (
            <>
              {userAskContent && (
                <UserAskContent
                  key={userAskContent.askId}
                  content={userAskContent.content}
                />
              )}
              <Content
                key={item.conversationId}
                conversationId={item.conversationId}
                content={item.content}
                isFinished={item.isFinish}
              />
            </>
          );
        })}
      </div>
      <div className={styles["input-container"]}>
        <div className={styles[""]}>
          <div>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 2 }}
              className={styles["input-textarea"]}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
          </div>
          <div
            className={classNames(
              "flex",
              "items-center",
              "justify-end",
              "p-[9px]",
            )}>
            <Tooltip title="发送">
              <div
                className={classNames("cursor-pointer")}
                onClick={sendMsgData}>
                <img
                  src={sendMsg}
                  className={classNames("w-[24px] h-[24px]")}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContent;
