import { useEffect, useState } from "react";
import startNodeSvg from "../../../../../assets/startNode.svg";
import commonStyles from "./styles/common.module.less";
import type { NodeItem } from "../../../../../store/nodeList";
import classNames from "classnames";
import { Tabs } from "antd";

interface ViewProps {
  nodeInfo: NodeItem;
}

function StartNodePanel(props: ViewProps) {
  const [nodeLabel, setNodeLabel] = useState("");
  useEffect(() => {
    setNodeLabel(props.nodeInfo.data.title);
  }, [props.nodeInfo]);
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
          <img src={startNodeSvg} className={commonStyles["header-icon"]} />
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
                  <div>
                    <div style={{ color: "#354052" }}>下一步</div>
                    <div style={{ color: "#676f83" }}>
                      添加此工作流程中的下一个节点{" "}
                    </div>
                  </div>
                  <div></div>
                </div>
              ),
            },
            {
              label: "上次运行",
              key: "preRunning",
              children: <div>22</div>,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default StartNodePanel;
