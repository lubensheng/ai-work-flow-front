import { Handle, Position } from "@xyflow/react";
import type { NodeItem } from "../../../../store/nodeList";

function ConditionNode(props: NodeItem) {
  console.log(props);
  return (
    <div>
      <div>
        <span>条件分支</span>
      </div>
      <Handle type="source" position={Position.Right}>
        <div>IF</div>
      </Handle>
      <Handle type="source" position={Position.Right}>
        <div>ELSE</div>
      </Handle>
    </div>
  );
}

export default ConditionNode;
