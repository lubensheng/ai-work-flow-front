import classNames from "classnames";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import type { NodeItem } from "../../../../store/nodeList";
import { Handle, Position } from "@xyflow/react";
import { NODE_TYPE, NODE_TYPE_ICON } from "../../constants";
import useNodeList from "../../../../store/nodeList";

function EndNode(props: NodeItem) {
  const { data } = props;
  const setSelectNode = useNodeList((state) => state.setSelectNode);
  const updateEdgeShowRelateNode = useNodeList(
    (s) => s.updateEdgeShowRelateNode
  );
  return (
    <div>
      <div
        className={classNames(
          commonStyles["common-node-container"],
          styles["end-node-container"],
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
    </div>
  );
}

export default EndNode;
