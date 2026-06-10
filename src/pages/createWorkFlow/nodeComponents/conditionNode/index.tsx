import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeItem } from "../../../../store/nodeList";
import {
  CONDITION_NODE_DRAG_HANDLE,
  SOURCE_HANDLE_ID_MAP,
} from "../../constants";
import conditionNodeSvg from "../../../../assets/conditionNode.svg";
import addNodeSvg from "../../../../assets/addNode.svg";
import commonStyle from "../common.module.less";
import classNames from "classnames";
import { Tooltip } from "antd";
import useNodeList from "../../../../store/nodeList";
import styles from "./index.module.less";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";
import useClickRightMenuNodeInfo from "../../../../store/clickRightMenuNodeInfo";

function ConditionNode(props: NodeItem) {
  console.log(props);
  const setSelectNode = useNodeList((state) => state.setSelectNode);
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const setClickRightMenuNodeInfo = useClickRightMenuNodeInfo(
    (s) => s.setStateInfo
  );
  const updateEdgeShowRelateNode = useNodeList(
    (s) => s.updateEdgeShowRelateNode
  );
  const { getNode, flowToScreenPosition, screenToFlowPosition } =
    useReactFlow();
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    const node = getNode(props.id);
    if (node) {
      const p = flowToScreenPosition(node.position);
      setClickRightMenuNodeInfo({
        position: { x: p.x + 150, y: p.y },
        nodeInfo: props,
      });
    }
  };

  const getNodePosition = (x: number, y: number) => {
    const flowPosition = screenToFlowPosition({
      x,
      y,
    });
    return {
      x: flowPosition.x - 15,
      y: flowPosition.y + 15,
    };
  };
  const handleAddNode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const handleAbsolutePosition = getNodePosition(e.clientX, e.clientY);
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
          commonStyle["common-node-container"],
          CONDITION_NODE_DRAG_HANDLE,
          "min-w-[190px]",
          "min-h-[100px]",
          "p-[16px]",
          "relative"
        )}
        onClick={() => {
          setSelectNode(props.id);
        }}
        onContextMenu={handleMenuClick}
      >
        <div className="p-[8px]">
          <img
            src={conditionNodeSvg}
            className={classNames(commonStyle["node-type-icon"], "rotate-270")}
          />
          <span>条件分支</span>
        </div>
        <div className="absolute right-[15px] top-[50%] mt-[-12px]">IF</div>
        <div className="absolute right-[15px] bottom-[3px] mt-[-12px]">
          ELSE
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${SOURCE_HANDLE_ID_MAP.CONDITION_NODE}-${props.id}-if`}
        style={{
          background: "none",
          border: "none",
        }}
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
            className={commonStyle["add-node-icon-container"]}
            onMouseLeave={() => {
              updateEdgeShowRelateNode();
            }}
            onMouseEnter={() => {
              updateEdgeShowRelateNode(props.id);
            }}
          >
            <img
              src={addNodeSvg}
              className={classNames(commonStyle["add-node-icon"])}
            />
          </div>
        </Tooltip>
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        id={`${SOURCE_HANDLE_ID_MAP.CONDITION_NODE}-${props.id}-else`}
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
            className={classNames(
              styles["else-add-node"],
              "absolute",
              "bottom-[-40px]"
            )}
            onMouseLeave={() => {
              updateEdgeShowRelateNode();
            }}
            onMouseEnter={() => {
              updateEdgeShowRelateNode(props.id);
            }}
          >
            <img
              src={addNodeSvg}
              className={classNames(styles["add-node-icon"])}
            />
          </div>
        </Tooltip>
      </Handle>
    </>
  );
}

export default ConditionNode;
