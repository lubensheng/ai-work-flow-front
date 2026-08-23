import classNames from "classnames";
import conditionNodeSvg from "../../../../../../assets/conditionNode.svg";
import type { NodeItem } from "../../../../../../store/types/nodeListTypes";
import commonStyle from "../../../common.module.less";
import styles from "./index.module.less";
import type { ConditionItem as ConditionItemType } from "../../../../../../store/types/nodeListTypes";
import { useEffect, useState } from "react";
import MidRelationLine from "./midRelationLine";
import { NEXT_NODE_CONTAINER_ID } from "./constant";
import {
  NODE_TYPE,
  NODE_TYPE_ICON,
  SOURCE_HANDLE_ID_MAP,
} from "../../../../constants";
import { useReactFlow } from "@xyflow/react";
import useClickAddPositionInfo from "../../../../../../store/clickAddPositionInfo";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function SetNextNodeByCondition(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const [currentNodeConditions, setCurrentNodeConditions] = useState<
    ConditionItemType[]
  >([]);
  console.log(nodeInfo);
  console.log(nodeList);
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const { getNode } = useReactFlow();
  useEffect(() => {
    if (!Array.isArray(nodeList)) {
      return;
    }
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo?.data.nodeConfig?.conditions) {
      setCurrentNodeConditions(currentNodeInfo.data.nodeConfig.conditions);
    }
  }, [nodeList, nodeInfo]);

  const getConditionRenderNode = (nodeId: string) => {
    const currentNodeInfo = nodeList.find((item) => item.id === nodeId);
    if (!currentNodeInfo) {
      return null;
    }
    let icon: string;
    switch (currentNodeInfo.type) {
      case NODE_TYPE.START_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.START_NODE];
        break;
      }
      case NODE_TYPE.AGENT_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.AGENT_NODE];
        break;
      }
      case NODE_TYPE.END_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.END_NODE];
        break;
      }
      case NODE_TYPE.CONDITION_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.ANNOTATION_NODE];
        break;
      }
      case NODE_TYPE.ANNOTATION_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.ANNOTATION_NODE];
        break;
      }
      case NODE_TYPE.LLM_NODE: {
        icon = NODE_TYPE_ICON[NODE_TYPE.LLM_NODE];
        break;
      }
      default: {
        return null;
      }
    }

    return (
      <div
        className={classNames(
          "flex",
          "align-middle",
          "items-center",
          "p-[4px]",
          styles["condition-node-container"]
        )}
      >
        {icon && <img src={icon} className="w-[16px] h-[16px] mr-[8px]" />}
        <span className="inline-block">{currentNodeInfo.data.title}</span>
      </div>
    );
  };

  const getConditionId = (conditionItem: ConditionItemType) => {
    console.log(conditionItem);
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    const index = currentNodeInfo?.data.nodeConfig?.conditions?.findIndex(
      (item) => item.id === conditionItem.id
    );
    if (typeof index === "undefined" || index === -1 || !currentNodeInfo) {
      return "";
    }
    if (conditionItem.type === "IF") {
      return `${SOURCE_HANDLE_ID_MAP.CONDITION_NODE}-${currentNodeInfo.id}-if-${
        index + 1
      }`;
    } else if (conditionItem.type === "ELSE") {
      return `${SOURCE_HANDLE_ID_MAP.CONDITION_NODE}-${
        currentNodeInfo.id
      }-else-${index + 1}`;
    } else {
      return "";
    }
  };

  const handleAddNode = (conditionItem: ConditionItemType) => {
    console.log(conditionItem);
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo) {
      const node = getNode(currentNodeInfo.id);
      if (!node) return null;
      const nodeX = node.position.x;
      const nodeY = node.position.y;

      const position = {
        x: nodeX + 180,
        y: nodeY + 50,
      };
      setCurrentNodeInfo({
        currentAddNodeInfo: {
          position: {
            x: position.x,
            y: position.y,
          },
          nodeInfo: {
            id: currentNodeInfo.id,
            conditionId: getConditionId(conditionItem),
          },
          edgeInfo: undefined,
        },
      });
    }
  };

  return (
    <div className="mt-[10px]">
      <div>
        <div className="text-[#354052] text-[13px] font-semibold">下一步</div>
        <div className="text-[#676f83] text-[12px] font-medium">
          添加此工作节点的下一个节点
        </div>
      </div>
      <div className="mt-[8px] flex">
        <div className={styles["icon-container"]}>
          <div>
            <img
              src={conditionNodeSvg}
              className={classNames(
                commonStyle["node-type-icon"],
                "rotate-270"
              )}
            />
          </div>
        </div>
        <MidRelationLine />
        <div className="flex-1" id={NEXT_NODE_CONTAINER_ID}>
          {currentNodeConditions.map((item, index) => {
            return (
              <div key={item.id + index} className={styles["node-container"]}>
                <div className={styles["title-container"]}>
                  Case {index + 1}
                </div>
                {item.handleNodeId?.map((item) => {
                  return <div key={item}>{getConditionRenderNode(item)}</div>;
                })}
                <div
                  className={styles["add-node"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNode(item);
                  }}
                >
                  <div className={styles.add}>
                    <span>+</span>
                  </div>
                  <div>
                    <span>添加并行节点</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SetNextNodeByCondition;
