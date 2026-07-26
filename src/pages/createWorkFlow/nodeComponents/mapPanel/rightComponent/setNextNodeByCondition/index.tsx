import classNames from "classnames";
import conditionNodeSvg from "../../../../../../assets/conditionNode.svg";
import type { NodeItem } from "../../../../../../store/types/nodeListTypes";
import commonStyle from "../../../common.module.less";
import styles from "./index.module.less";
import type { ConditionItem as ConditionItemType } from "../../../../../../store/types/nodeListTypes";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    if (!Array.isArray(nodeList)) {
      return;
    }
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo?.data.nodeConfig?.conditions) {
      setCurrentNodeConditions(currentNodeInfo.data.nodeConfig.conditions);
    }
  }, [nodeList, nodeInfo]);
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
        <div className="w-[24px]"></div>
        <div className="flex-1">
          {currentNodeConditions.map((item, index) => {
            return (
              <div key={item.id + index}>
                <div>Case {index}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SetNextNodeByCondition;
