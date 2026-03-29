import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import addNodeSvg from "../../../../assets/addNode.svg";
import startNodeSvg from "../../../../assets/startNode.svg";
import classNames from "classnames";
import { memo, useMemo } from "react";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";
import { SOURCE_HANDLE_ID_MAP } from "../../constants";

function StartNode(props: NodeProps) {
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const { getNode } = useReactFlow();
  const handleAbsolutePosition = useMemo(() => {
    const node = getNode(props.id);
    if (!node) return null;
    const nodeX = node.position.x;
    const nodeY = node.position.y;
    return {
      x: nodeX + 150,
      y: nodeY + 30,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, getNode]);

  const handleStart = () => {
    console.log("开始整个流程");
  };

  const handleAddNode = () => {
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
          styles["start-node-container"]
        )}
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
          width: "1em",
          height: "1em",
        }}
      >
        <img
          src={addNodeSvg}
          className={commonStyles["add-node-icon"]}
          onClick={handleAddNode}
        />
      </Handle>
    </>
  );
}

export default memo(StartNode);
