import { FormOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import styles from "../../index.module.less";
import { useReactFlow } from "@xyflow/react";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";
import useNodeList, { type NodeItem } from "../../../../store/nodeList";
import useNodeIdInfo from "../../../../store/nodeIdInfo";
import { NODE_PREFIX_MAP, NODE_TYPE } from "../../constants";
import { useEffect } from "react";

function LeftPanel() {
  const { screenToFlowPosition } = useReactFlow();
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const allNodeIds = useNodeIdInfo((state) => state);
  const setNodeIdIndex = useNodeIdInfo((state) => state.setNodeIdIndex);
  const setCurrentPanelAddNode = useNodeList(
    (state) => state.setCurrentPanelAddNode
  );
  const currentPanelAddNode = useNodeList((state) => state.currentPanelAddNode);
  const updateNodePostionByNodeId = useNodeList(
    (state) => state.updateNodePostionByNodeId
  );
  const clearCurrentPanelAddNode = useNodeList(
    (state) => state.clearCurrentPanelAddNode
  );

  const handleNodeMouseMove = (e: MouseEvent) => {
    if (!currentPanelAddNode?.id) {
      return;
    }
    const flowPosition = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
    console.log(flowPosition);
    updateNodePostionByNodeId(currentPanelAddNode?.id, flowPosition);
  };

  const handleWindowCLick = () => {
    clearCurrentPanelAddNode();
  };

  useEffect(() => {
    if (currentPanelAddNode) {
      window.addEventListener("mousemove", handleNodeMouseMove);
      window.addEventListener("click", handleWindowCLick);
      return () => {
        window.removeEventListener("mousemove", handleNodeMouseMove);
        window.removeEventListener("click", handleWindowCLick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPanelAddNode]);
  return (
    <div className={styles["flow-operation-container"]}>
      <div
        className={styles.hover}
        onClick={(e) => {
          console.log(e);
          const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
          setCurrentNodeInfo({
            currentAddNodeInfo: {
              position,
              nodeInfo: undefined,
              edgeInfo: undefined,
            },
          });
        }}
      >
        <Tooltip title="添加节点">
          <PlusCircleOutlined />
        </Tooltip>
      </div>
      <div
        className={styles.hover}
        onClick={(e) => {
          e.stopPropagation();
          const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
          console.log(position);
          const nodeId = allNodeIds[NODE_TYPE.ANNOTATION_NODE];
          setNodeIdIndex(NODE_TYPE.ANNOTATION_NODE);
          const nodeInfo: NodeItem = {
            id: `${NODE_PREFIX_MAP[NODE_TYPE.ANNOTATION_NODE]}-${nodeId}`,
            position: position,
            data: {
              childrenIds: [],
              label: 0,
              title: "",
              select: false,
              nodeConfig: undefined,
            },
            type: NODE_TYPE.ANNOTATION_NODE,
          };
          setCurrentPanelAddNode(nodeInfo);
        }}
      >
        <Tooltip title="添加注释">
          <FormOutlined />
        </Tooltip>
      </div>
    </div>
  );
}

export default LeftPanel;
