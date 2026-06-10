import { Input, message, Tooltip } from "antd";
import sendMsg from "../../../assets/sendMsg.svg";
import classNames from "classnames";
import styles from "./index.module.less";
import { useEffect, useRef, useState } from "react";
import Content from "./content";
import UserAskContent from "./userAskContent";

function RightContent() {
  const [inputValue, setInputValue] = useState<string>();
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contentList, setContentList] = useState<
    { conversationId: string; content: string; isFinish: boolean }[]
  >([
    {
      isFinish: true,
      conversationId: "conversationId-1",
      content: `
  # 标题测试
  **加粗文本** *斜体文本*
  
  ~~删除线~~
  
  - 普通列表
  - [x] 已完成任务
  - [ ] 待办任务
  
  | 姓名 | 年龄 |
  | ---- | ---- |
  | 小明 | 20 |
  `,
    },
    {
      isFinish: true,
      conversationId: "conversationId-2",
      content: `
  # 标题测试
  **加粗文本** *斜体文本*
  
  ~~删除线~~
  
  - 普通列表
  - [x] 已完成任务
  - [ ] 待办任务
  
  | 姓名 | 年龄 |
  | ---- | ---- |
  | 小明 | 20 |
  `,
    },
  ]);
  const [userAskList, setUserAskList] = useState<
    { askId: string; relateConversationId: string; content: string }[]
  >([
    {
      askId: "askId-1",
      relateConversationId: "conversationId-1",
      content: "test-content",
    },
    {
      askId: "askId-2",
      relateConversationId: "conversationId-2",
      content: "test-content2",
    },
  ]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contentList]);

  const connectSSE = (id: string) => {
    // 关闭已有连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // 接口地址，对应 Nest 后端
    const sseUrl =
      "/agent/mockConversation?apiType=claude&apiKey=www&content=2222";
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
    connectSSE("conversationId-" + (contentList.length + 1));
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
