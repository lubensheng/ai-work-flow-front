import classNames from "classnames";
import commonStyles from "../styles/common.module.less";
import type { NodeItem } from "../../../../../../store/types/nodeListTypes";
import { useEffect, useState } from "react";
import useNodeList from "../../../../../../store/nodeList";
import { NODE_TYPE, NODE_TYPE_ICON } from "../../../../constants";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function PublicNodeBaseSetHeader(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeDesc, setNodeDesc] = useState("");
  const updateNodeData = useNodeList((s) => s.updateNodeData);
  useEffect(() => {
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo) {
      setNodeTitle(currentNodeInfo.data.title);
      setNodeDesc(currentNodeInfo.data.desc || "");
    }
  }, [nodeInfo, nodeList]);

  const nodeIcon = NODE_TYPE_ICON[nodeInfo.type];

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "16px 16px 4px 16px",
          alignItems: "center",
        }}
      >
        <div>
          {nodeIcon && (
            <img
              src={nodeIcon}
              className={classNames(
                commonStyles["header-icon"],
                nodeInfo.type === NODE_TYPE.CONDITION_NODE ? "rotate-270" : ""
              )}
            />
          )}
        </div>
        <div style={{ marginBottom: "3px", marginLeft: "5px" }}>
          <input
            className={commonStyles["set_node_label_input"]}
            placeholder="添加标题..."
            value={nodeTitle}
            maxLength={24}
            onChange={(e) => {
              updateNodeData(e.target.value, "title", nodeInfo.id);
            }}
          />
        </div>
      </div>
      <div style={{ padding: "4px 16px 4px 16px" }}>
        <input
          className={classNames(
            commonStyles["set_node_label_input"],
            commonStyles["set_node_desc_input"]
          )}
          value={nodeDesc}
          onChange={(e) => {
            updateNodeData(e.target.value, "desc", nodeInfo.id);
          }}
          placeholder="添加描述..."
        />
      </div>
    </>
  );
}

export default PublicNodeBaseSetHeader;
