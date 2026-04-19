import { getChildrenNodeInfo } from "./utils";
import commonStyles from "./styles/common.module.less";
import styles from "./styles/nextNodeList.module.less";
import type { NodeItem } from "../../../../../store/nodeList";
import { NODE_TYPE_ICON, type NODE_TYPE } from "../../../constants";
import { useReactFlow } from "@xyflow/react";
import useClickAddPositionInfo from "../../../../../store/clickAddPositionInfo";
import useNodeList from "../../../../../store/nodeList";

interface ViewProps {
  currentNodeInfo: NodeItem;
  childrenIds: string[];
  nodeList: NodeItem[];
  nodeType: NODE_TYPE;
}

function NextNodeList(props: ViewProps) {
  const { childrenIds, nodeList, nodeType, currentNodeInfo } = props;
  const { getNode } = useReactFlow();
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (s) => s.setCurrentNodeInfo
  );
  const setSelectNode = useNodeList((s) => s.setSelectNode);

  const handleClickSubNode = (nodeInfo: NodeItem) => {
    setSelectNode(nodeInfo.id);
  };

  return (
    <div style={{ display: "flex", marginTop: "10px", position: "relative" }}>
      <div className={styles["currentNode-icon-container"]}>
        <img
          src={NODE_TYPE_ICON[nodeType]}
          className={commonStyles["header-icon"]}
        />
      </div>
      <div className={styles["left-line"]}></div>
      <div className={styles["mid-line"]}></div>
      <div className={styles["right-line"]}></div>
      <div className={styles["right-content-container"]}>
        {getChildrenNodeInfo(childrenIds, nodeList).map((item) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={(e) => {
              e.stopPropagation();
              handleClickSubNode(item);
            }}
          >
            <img
              src={NODE_TYPE_ICON[item.type]}
              className={commonStyles["header-icon"]}
            />
            <div style={{ marginLeft: "10px" }}>{item.data.title}</div>
          </div>
        ))}
        <div
          className={styles["add-node"]}
          onClick={() => {
            const node = getNode(currentNodeInfo.id);
            if (!node) return null;
            const nodeX = node.position.x;
            const nodeY = node.position.y;
            const position = {
              x: nodeX + 150,
              y: nodeY + 30,
            };
            setCurrentNodeInfo({
              currentAddNodeInfo: {
                position: {
                  x: position.x,
                  y: position.y,
                },
                nodeInfo: currentNodeInfo,
                edgeInfo: undefined,
              },
            });
          }}
        >
          <div className={styles.add}>
            <span>+</span>
          </div>
          <div>
            <span>添加节点</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextNodeList;
