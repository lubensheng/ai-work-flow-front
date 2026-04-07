import { useEffect, useState } from "react";
import startNodeSvg from "../../../../../assets/startNode.svg";
import commonStyles from "./styles/common.module.less";
import styles from "./styles/startNode.module.less";
import type { NodeItem } from "../../../../../store/nodeList";
import classNames from "classnames";
import { Tabs } from "antd";
import NextNodeList from "./nextNodeList";
import type { Field } from "../../../type";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function StartNodePanel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const [nodeLabel, setNodeLabel] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    setNodeLabel(props.nodeInfo.data.title);
    setFields(props.nodeInfo.data.nodeConfig?.fields || []);
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
                    <div style={{ color: "#354052" }}>输入字段</div>
                  </div>
                  <div>
                    {fields.map((item) => (
                      <div key={item.key} className={styles["field-item"]}>
                        {item.showName}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <div style={{ color: "#354052" }}>下一步</div>
                  </div>
                  <div>
                    <div style={{ color: "#676f83" }}>
                      添加此工作流程中的下一个节点{" "}
                    </div>
                    <NextNodeList
                      childrenIds={nodeInfo.data.childrenIds}
                      nodeList={nodeList}
                      nodeType={nodeInfo.type}
                      currentNodeInfo={nodeInfo}
                    />
                  </div>
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
