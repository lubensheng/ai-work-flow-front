import classNames from "classnames";
import startNewConversation from "../../../assets/startNewConversation.svg";
import styles from "./index.module.less";
import type { ConversationItem } from "../type";

interface ViewProps {
  appName: string;
  conversationList: ConversationItem[];
  addConversationList: () => void;
  selectConversationId: string;
  updateCurrentSelectCurrentConversationId: (id: string) => void;
}

function LeftConversationInfo(props: ViewProps) {
  const {
    appName,
    conversationList,
    addConversationList,
    updateCurrentSelectCurrentConversationId,
    selectConversationId,
  } = props;

  return (
    <div className="w-[20%]">
      <div>{appName}</div>
      {conversationList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames(
              styles["conversation-title-container"],
              selectConversationId === item.id
                ? styles["conversation-title-container-click"]
                : styles["conversation-title-container-hover"]
            )}
            onClick={() => {
              updateCurrentSelectCurrentConversationId(item.id);
            }}
          >
            对话{index + 1}
          </div>
        );
      })}
      <div
        className={classNames(
          "w-[200px]",
          "flex",
          "items-center",
          "justify-center",
          "cursor-pointer",
          "mt-[10px]",
          styles["start-new-conversation"]
        )}
        onClick={addConversationList}
      >
        <div>
          <img src={startNewConversation} className="w-[24px] h-[24px]" />
        </div>
        <span>开启新的对话</span>
      </div>
    </div>
  );
}

export default LeftConversationInfo;
