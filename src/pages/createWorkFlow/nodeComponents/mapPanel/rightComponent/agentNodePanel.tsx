import type { NodeItem } from "../../../../../store/nodeList";
import { ConfigProvider, Select, Tabs } from "antd";
import zhCh from "antd/locale/zh_CN";
import PublicNodeBaseSetHeader from "./publicNodeBaseSetHeader";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function AgentNodePanel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  return (
    <div>
      <PublicNodeBaseSetHeader nodeInfo={nodeInfo} nodeList={nodeList} />
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
