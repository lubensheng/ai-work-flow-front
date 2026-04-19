import classNames from "classnames";
import commonStyles from "./styles/common.module.less";
import AgentNodeSvg from "../../../../../assets/agentIcon.svg";
import type { NodeItem } from "../../../../../store/nodeList";
import { useEffect, useState } from "react";
import { ConfigProvider, Select, Tabs } from "antd";
import zhCh from "antd/locale/zh_CN";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function AgentNodePanel(props: ViewProps) {
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
          <img src={AgentNodeSvg} className={commonStyles["header-icon"]} />
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
        <ConfigProvider locale={zhCh}>
          <Tabs
            items={[
              {
                label: "设置",
                key: "setting",
                children: (
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h3 style={{ color: "#354052", padding: 0, margin: 0 }}>
                        Agent策略
                      </h3>
                      <span
                        style={{
                          color: "red",
                          display: "inline-block",
                          transform: "translate(6px, 2px)",
                        }}
                      >
                        *
                      </span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Select
                        placeholder="请选择Agent策略"
                        style={{ width: "100%" }}
                      ></Select>
                    </div>
                  </div>
                ),
              },
              {
                label: "上次运行",
                key: "preRunning",
                children: (
                  <div>
                    <div>
                      <span>*</span>
                      <span>Agent策略</span>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default AgentNodePanel;
