import { Input, Tooltip } from "antd";
import sendMsg from "../../../assets/sendMsg.svg";
import classNames from "classnames";
import styles from "./index.module.less";
import { useState } from "react";
import Content from "./content";
import UserAskContent from "./userAskContent";

function RightContent() {
  const [inputValue, setInputValue] = useState<string>();
  const [contentList] = useState<{ conversationId: string; content: string }[]>(
    [
      {
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
    ]
  );
  const [userAskList] = useState<
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

  const sendMsgData = () => {
    console.log(inputValue);
  };
  return (
    <div className={classNames("w-[70%]", "flex-1")}>
      <div className={styles["content-container"]}>
        {contentList.map((item) => {
          const userAskContent = userAskList.find(
            (i) => i.relateConversationId === item.conversationId
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
              "p-[9px]"
            )}
          >
            <Tooltip title="发送">
              <div
                className={classNames("cursor-pointer")}
                onClick={sendMsgData}
              >
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
