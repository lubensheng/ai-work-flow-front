import useClickRightMenuNodeInfo from "../../../store/clickRightMenuNodeInfo";
import useNodeList from "../../../store/nodeList";
import styles from "./index.module.less";
import classNames from "classnames";

function NodeRightClickMenu() {
  const position = useClickRightMenuNodeInfo((s) => s.position);
  const nodeInfo = useClickRightMenuNodeInfo((s) => s.nodeInfo);
  const deleteNode = useNodeList((s) => s.deleteNode);
  return nodeInfo && position ? (
    <div
      className={styles.container}
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
      }}
    >
      <div>
        <div
          className={classNames(
            "cursor-pointer",
            "pl-[10px]",
            "h-[32px]",
            styles["delete-hover"]
          )}
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(nodeInfo);
          }}
        >
          删除
        </div>
      </div>
    </div>
  ) : undefined;
}

export default NodeRightClickMenu;
