import classNames from "classnames";
import startNewConversation from "../../../assets/startNewConversation.svg";
import styles from "./index.module.less";

interface ViewProps {
  appName: string;
}

function LeftConversationInfo(props: ViewProps) {
  const { appName } = props;
  return (
    <div className="w-[20%]">
      <div>{appName}</div>
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
