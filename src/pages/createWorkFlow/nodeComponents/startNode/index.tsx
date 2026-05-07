import { Handle, Position, useReactFlow } from "@xyflow/react";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import addNodeSvg from "../../../../assets/addNode.svg";
import startNodeSvg from "../../../../assets/startNode.svg";
import classNames from "classnames";
import { memo } from "react";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";
import { SOURCE_HANDLE_ID_MAP, START_NODE_DRAG_HANDLE } from "../../constants";
import type { NodeItem } from "../../../../store/nodeList";
import useNodeList from "../../../../store/nodeList";

function StartNode(props: NodeItem) {
  const { data } = props;
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const setSelectNode = useNodeList((state) => state.setSelectNode);
  const updateEdgeShowRelateNode = useNodeList(
    (s) => s.updateEdgeShowRelateNode
  );
  const { getNode } = useReactFlow();

  const handleStart = () => {
    console.log("开始整个流程");
  };
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

  const handleAddNode = () => {
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
          styles["start-node-container"],
          START_NODE_DRAG_HANDLE,
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
        <div style={{ cursor: "pointer" }} onClick={handleStart}>
          <img src={startNodeSvg} className={commonStyles["node-type-icon"]} />
          <span className={commonStyles["font-styles"]}>开始</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={SOURCE_HANDLE_ID_MAP.START_NODE}
        style={{
          background: "none",
          border: "none",
        }}
      >
        <div className={commonStyles["add-node-icon-container"]}>
          <img
            src={addNodeSvg}
            className={commonStyles["add-node-icon"]}
            onClick={handleAddNode}
          />
        </div>
      </Handle>
    </>
  );
}

export default memo(StartNode);
