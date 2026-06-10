import classNames from "classnames";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import type { NodeItem } from "../../../../store/nodeList";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import {
  END_NODE_DRAG_HANDLE,
  NODE_TYPE,
  NODE_TYPE_ICON,
} from "../../constants";
import useNodeList from "../../../../store/nodeList";
import useClickRightMenuNodeInfo from "../../../../store/clickRightMenuNodeInfo";

function EndNode(props: NodeItem) {
  const { data } = props;
  const setSelectNode = useNodeList((state) => state.setSelectNode);
  const updateEdgeShowRelateNode = useNodeList(
    (s) => s.updateEdgeShowRelateNode
  );
  const setClickRightMenuNodeInfo = useClickRightMenuNodeInfo(
    (s) => s.setStateInfo
  );
  const { getNode, flowToScreenPosition } = useReactFlow();
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
  return (
    <div>
      <div
        className={classNames(
          commonStyles["common-node-container"],
          styles["end-node-container"],
          END_NODE_DRAG_HANDLE,
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
        onContextMenu={handleMenuClick}
      >
        <div>
          <img
            src={NODE_TYPE_ICON[NODE_TYPE.END_NODE]}
            className={commonStyles["node-type-icon"]}
          />
          <span className={commonStyles["font-styles"]}>结束</span>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "none",
          border: "none",
          height: "9px",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "9px",
            backgroundColor: "#1296db",
            position: "absolute",
            left: "1px",
          }}
        ></div>
      </Handle>
    </div>
  );
}

export default EndNode;
