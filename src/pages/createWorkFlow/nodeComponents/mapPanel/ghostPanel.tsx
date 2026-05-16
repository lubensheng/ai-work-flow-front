import { useEffect } from "react";
import { NODE_TYPE } from "../../constants";
import useNodeList from "../../../../store/nodeList";
import { useReactFlow } from "@xyflow/react";

function GhostPanel() {
  const { screenToFlowPosition } = useReactFlow();
  const currentMenuAddNode = useNodeList((state) => state.currentMenuAddNode);
  const updateNodePostionByNodeId = useNodeList(
    (state) => state.updateNodePostionByNodeId
  );
  const clearCurrentMenuAddNode = useNodeList(
    (state) => state.clearCurrentMenuAddNode
  );
  const handleNodeMouseMove = (e: MouseEvent) => {
    if (!currentMenuAddNode?.id) {
      return;
    }
    const flowPosition = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
    console.log(flowPosition);
    const rectFlowDom = document.querySelector(
      ".react-flow__pane.draggable"
    ) as HTMLDivElement;
    const rectFlowNodeDom = document.querySelector(
      `.react-flow__node.draggable[data-id=${currentMenuAddNode.id}]`
    ) as HTMLDivElement;
    if (rectFlowDom?.style.cursor !== "pointer" && rectFlowDom) {
      rectFlowDom.style.cursor = "pointer";
    }
    if (rectFlowNodeDom?.style.cursor !== "pointer" && rectFlowNodeDom) {
      rectFlowNodeDom.style.cursor = "pointer";
    }
    updateNodePostionByNodeId(currentMenuAddNode?.id, flowPosition);
  };

  const handleWindowCLick = () => {
    if (currentMenuAddNode) {
      const rectFlowDom = document.querySelector(
        ".react-flow__pane.draggable"
      ) as HTMLDivElement;
      const rectFlowNodeDom = document.querySelector(
        `.react-flow__node.draggable[data-id=${currentMenuAddNode.id}]`
      ) as HTMLDivElement;
      if (rectFlowDom?.style.cursor === "pointer" && rectFlowDom) {
        rectFlowDom.style.cursor = "grab";
      }
      if (rectFlowNodeDom?.style.cursor === "pointer" && rectFlowNodeDom) {
        rectFlowNodeDom.style.cursor = "grab";
      }
    }
    clearCurrentMenuAddNode();
  };

  useEffect(() => {
    if (
      currentMenuAddNode &&
      ![NODE_TYPE.ANNOTATION_NODE].includes(currentMenuAddNode?.type)
    ) {
      window.addEventListener("mousemove", handleNodeMouseMove);
      window.addEventListener("click", handleWindowCLick);
    } else {
      window.removeEventListener("mousemove", handleNodeMouseMove);
      window.removeEventListener("click", handleWindowCLick);
    }
    return () => {
      window.removeEventListener("mousemove", handleNodeMouseMove);
      window.removeEventListener("click", handleWindowCLick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMenuAddNode]);
  console.log("currentMenuAddNode", currentMenuAddNode);
  return <div className="w-[70px] h-[100px]"></div>;
}

export default GhostPanel;
