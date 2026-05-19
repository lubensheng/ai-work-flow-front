import classNames from "classnames";
import { useState } from "react";
import commonStyles from "./styles/common.module.less";
import conditionNodeSvg from "../../../../../assets/conditionNode.svg";
import { Tabs } from "antd";
import ConditionList from "./conditionList";
import type { NodeItem } from "../../../../../store/nodeList";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function ConditionNodePanel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  console.log(nodeList);
  const [nodeLabel] = useState("");
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "16px 16px 4px 16px",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={conditionNodeSvg}
            className={classNames(commonStyles["header-icon"], "rotate-270")}
          />
        </div>
        <div style={{ marginBottom: "3px", marginLeft: "5px" }}>
          <input
            className={commonStyles["set_node_label_input"]}
            placeholder="添加标题..."
            value={nodeLabel}
          />
        </div>
      </div>
      <div style={{ padding: "4px 16px 4px 16px" }}>
        <input
          className={classNames(
            commonStyles["set_node_label_input"],
            commonStyles["set_node_desc_input"]
          )}
          placeholder="添加描述..."
        />
      </div>
      <div style={{ padding: "0 16px" }}>
        <Tabs
          items={[
            {
              label: "设置",
              key: "setting",
              children: (
                <div>
                  <ConditionList nodeInfo={nodeInfo} nodeList={nodeList} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ConditionNodePanel;
