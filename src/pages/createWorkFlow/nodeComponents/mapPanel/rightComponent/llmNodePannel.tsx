import { useEffect, useState } from "react";
import { ConfigProvider, Select, Tabs } from "antd";
import zhCh from "antd/locale/zh_CN";
import useLLMConfig from "../../../../../store/llmConfig";
import useNodeList, {
  type NodeDataValueType,
  type NodeItem,
} from "../../../../../store/nodeList";
import PublicNodeBaseSetHeader from "./publicNodeBaseSetHeader";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function LlmNodePannel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const currentLLMConfig = useLLMConfig((s) => s.currentLLMConfig);
  const updateNodeData = useNodeList((s) => s.updateNodeData);
  const [currentLLMConfigValue, setCurrentLLMConfigValue] = useState<number>();

  const handleUpdateLLMConifg = (modalId: number) => {
    const currentInfo = currentLLMConfig.find((item) => item.id === modalId);
    if (currentInfo) {
      updateNodeData(
        currentInfo as unknown as NodeDataValueType,
        "nodeConfig.llmApiConfig",
        nodeInfo.id
      );
    } else {
      console.log("没有找到对应的配置");
    }
  };

  useEffect(() => {
    if (!Array.isArray(nodeList)) {
      return;
    }
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo?.data.nodeConfig?.llmApiConfig) {
      setCurrentLLMConfigValue(currentNodeInfo.data.nodeConfig.llmApiConfig.id);
    }
  }, [nodeList, nodeInfo]);

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
                        模型
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
                        placeholder="请选择模型"
                        style={{ width: "100%" }}
                        options={currentLLMConfig.map((item) => {
                          return {
                            label: item.modalType,
                            value: item.id,
                          };
                        })}
                        value={currentLLMConfigValue}
                        onChange={(value) => {
                          console.log(value);
                          handleUpdateLLMConifg(value);
                        }}
                      />
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

export default LlmNodePannel;
