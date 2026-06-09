import { isEqual } from "lodash";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./index.module.less";
import RobotSvg from "../../../assets/robot.svg";

interface ViewProps {
  conversationId: string;
  content: string;
  isFinished: boolean;
}

function Content(props: ViewProps) {
  const { content, isFinished } = props;
  console.log("content", isFinished);
  return (
    <div className={styles["content-item-container"]}>
      <div className={styles["icon-container"]}>
        <img src={RobotSvg} className="w-[24px] h-[24px]" />
      </div>
      <div className={styles["content"]}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default memo<ViewProps>(Content, (preProps, nextProps) => {
  return (
    isEqual(preProps.content, nextProps.content) &&
    isEqual(preProps.conversationId, preProps.conversationId) &&
    isEqual(preProps.isFinished, nextProps.isFinished)
  );
});
