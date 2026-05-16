import { Handle, Position, useReactFlow } from "@xyflow/react";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import classNames from "classnames";
import addNodeSvg from "../../../../assets/addNode.svg";
import agentIcon from "../../../../assets/agentIcon.svg";
import { AGENT_NODE_DRAG_HANDLE, SOURCE_HANDLE_ID_MAP } from "../../constants";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";
import { memo } from "react";
import type { NodeItem } from "../../../../store/nodeList";
import useNodeList from "../../../../store/nodeList";
import { Tooltip } from "antd";

function AgentNode(props: NodeItem) {
  const { data } = props;
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const setSelectNode = useNodeList((state) => state.setSelectNode);
  const updateEdgeShowRelateNode = useNodeList(
    (s) => s.updateEdgeShowRelateNode
  );
  const { getNode } = useReactFlow();

  const getNodePosition = () => {
    const node = getNode(props.id);
    if (!node) return null;
    const nodeX = node.position.x;
    const nodeY = node.position.y;
    return {
      x: nodeX + 150,
      y: nodeY + 30,
    };
  };

  const handleAddNode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const handleAbsolutePosition = getNodePosition();
    if (handleAbsolutePosition) {
      setCurrentNodeInfo({
        currentAddNodeInfo: {
          position: {
            x: handleAbsolutePosition?.x,
            y: handleAbsolutePosition?.y,
          },
          nodeInfo: {
            id: props.id,
          },
          edgeInfo: undefined,
        },
      });
    }
  };
  return (
    <>
      <div
        className={classNames(
          commonStyles["common-node-container"],
          styles["agent-node-container"],
          AGENT_NODE_DRAG_HANDLE,
          data.select
            ? commonStyles["active-node-container"]
            : commonStyles["unActive-node-container"]
        )}
        onClick={() => {
          setSelectNode(props.id);
        }}
        onMouseLeave={() => {
          updateEdgeShowRelateNode();
        }}
        onMouseEnter={() => {
          updateEdgeShowRelateNode(props.id);
        }}
      >
        <div>
          <img src={agentIcon} className={styles["agent-icon"]} />
          <span style={{ display: "inline-block", marginLeft: "10px" }}>
            {`Agent ${props?.data?.label || ""}`}
          </span>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "none",
          border: "none",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "9px",
            backgroundColor: "#1296db",
            position: "absolute",
            top: "-3px",
            left: "1px",
          }}
        ></div>
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        id={`${SOURCE_HANDLE_ID_MAP.AGENT_NODE}-${props.id}`}
        style={{
          background: "none",
          border: "none",
        }}
        onClick={handleAddNode}
      >
        <Tooltip
          arrow={false}
          styles={{
            root: {
              backgroundColor: "#fff",
              color: "#000",
            },
            container: {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
          title={
            <div>
              <div>
                <span className="text-[#000000] font-semibold">点击</span>
                <span className="text-[#676f83]">添加节点</span>
              </div>
              <div>
                <span className="text-[#000000] font-semibold">拖拽</span>
                <span className="text-[#676f83]">连接节点</span>
              </div>
            </div>
          }
        >
          <div
            className={commonStyles["add-node-icon-container"]}
            onMouseLeave={() => {
              updateEdgeShowRelateNode();
            }}
            onMouseEnter={() => {
              updateEdgeShowRelateNode(props.id);
            }}
          >
            <img
              src={addNodeSvg}
              className={classNames(commonStyles["add-node-icon"])}
            />
          </div>
        </Tooltip>
      </Handle>
    </>
  );
}

export default memo(AgentNode);
