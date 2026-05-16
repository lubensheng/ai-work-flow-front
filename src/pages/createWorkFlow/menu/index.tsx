import { useReactFlow, ViewportPortal } from "@xyflow/react";
import styles from "./index.module.less";
import { Tabs, Tooltip } from "antd";
import agentIcon from "../../../assets/agentIcon.svg";
import endNodeIcon from "../../../assets/endFlowNode.svg";
import classNames from "classnames";
import {
  NODE_PREFIX_MAP,
  NODE_TITLE_PREFIX_MAP,
  NODE_TYPE,
} from "../constants";
import useNodeList, { type NodeItem } from "../../../store/nodeList";
import useNodeIdInfo from "../../../store/nodeIdInfo";
import useClickAddPositionInfo from "../../../store/clickAddPositionInfo";
import { getDragHandle } from "../../../utils";
import { type CSSProperties } from "react";

interface ViewProps {
  position?: { x: number; y: number };
  style?: CSSProperties;
  nodeId?: string;
  edgesInfo?: {
    source: string;
    target: string;
    edgeId: string;
  };
}

function MenuList(props: ViewProps) {
  const { position, nodeId, edgesInfo, style = {} } = props;
  const { screenToFlowPosition } = useReactFlow();
  const setNodeList = useNodeList((state) => state.setNodeList);
  const setNodeListByEdgesInfo = useNodeList(
    (state) => state.setNodeListByEdgesInfo
  );
  const allNodeIds = useNodeIdInfo((state) => state);
  const setNodeIdIndex = useNodeIdInfo((s) => s.setNodeIdIndex);
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const setNotParentIdNode = useNodeList((s) => s.setNotParentIdNode);
  const handleAddNode = (
    type: NODE_TYPE,
    position: { x: number; y: number }
  ) => {
    if (nodeId) {
      const currentNodeId = allNodeIds[type];
      setNodeIdIndex(type);
      setNodeList(nodeId, {
        id: `${NODE_PREFIX_MAP[type]}-${currentNodeId}`,
        position: { x: 400, y: 0 },
        dragHandle: getDragHandle(type),
        data: {
          childrenIds: [],
          label: currentNodeId,
          select: false,
          title: `${NODE_TITLE_PREFIX_MAP[type]}-${currentNodeId}`,
        },
        type: type,
      });
      setCurrentNodeInfo({
        currentAddNodeInfo: {},
      });
    } else if (edgesInfo) {
      // 这就是中间的
      const currentNodeId = allNodeIds[type];
      setNodeIdIndex(type);
      setNodeListByEdgesInfo(edgesInfo, {
        id: `${NODE_PREFIX_MAP[type]}-${currentNodeId}`,
        position: { x: 400, y: 0 },
        dragHandle: getDragHandle(type),
        data: {
          childrenIds: [],
          label: currentNodeId,
          select: false,
          title: `${NODE_TITLE_PREFIX_MAP[type]}-${currentNodeId}`,
        },
        type: type,
      });
      setCurrentNodeInfo({
        currentAddNodeInfo: {},
      });
    } else {
      // 全是空的情况
      if (!position) {
        console.error("当前节点没有position, 检查为啥没有position");
        return;
      }
      const currentNodeId = allNodeIds[type];
      setNodeIdIndex(type);
      const nodeInfo: NodeItem = {
        id: `${NODE_PREFIX_MAP[type]}-${currentNodeId}`,
        position: { x: position.x, y: position.y },
        dragHandle: getDragHandle(type),
        data: {
          childrenIds: [],
          label: currentNodeId,
          select: false,
          title: `${NODE_TITLE_PREFIX_MAP[type]}-${currentNodeId}`,
        },
        type: type,
      };
      setNotParentIdNode(nodeInfo);
      setCurrentNodeInfo({
        currentAddNodeInfo: {},
      });
    }
  };

  return (
    <ViewportPortal>
      <div
        className={styles["container"]}
        style={{
          ...style,
          ...(position
            ? {
                left: `${position.x + 25}px`,
                top: `${position.y - 20}px`,
                position: "absolute",
                background: "#fff",
                zIndex: 99999999,
                pointerEvents: "all",
              }
            : {}),
        }}
      >
        <Tabs
          items={[
            {
              label: "节点",
              key: "node",
              children: (
                <div style={{ marginBottom: "10px" }}>
                  <Tooltip
                    getPopupContainer={(node) => node}
                    arrow={false}
                    title={
                      <div>
                        <img
                          src={agentIcon}
                          style={{ width: "30px", height: "30px" }}
                        />
                        <div>
                          <div style={{ color: "#000", fontSize: "14px" }}>
                            Agent
                          </div>
                          <div style={{ color: "#ccc", fontSize: "12px" }}>
                            调用大型语言模型回答问题或者处理问题
                          </div>
                        </div>
                      </div>
                    }
                    placement="right"
                  >
                    <div
                      className={classNames(styles.item, styles.hover)}
                      style={{ padding: "8px 12px 8px 8px", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const flowPosition = screenToFlowPosition({
                          x: e.clientX,
                          y: e.clientY,
                        });
                        console.log(flowPosition);
                        handleAddNode(NODE_TYPE.AGENT_NODE, flowPosition);
                      }}
                    >
                      <img src={agentIcon} className={styles["image"]} />
                      <span className={styles["text"]}>Agent</span>
                    </div>
                  </Tooltip>
                  <div
                    className={classNames(styles.item, styles.hover)}
                    style={{ padding: "8px 12px 8px 8px", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const flowPosition = screenToFlowPosition({
                        x: e.clientX,
                        y: e.clientY,
                      });
                      handleAddNode(NODE_TYPE.END_NODE, flowPosition);
                    }}
                  >
                    <img src={endNodeIcon} className={styles["image"]} />
                    <span className={styles["text"]}>结束</span>
                  </div>
                </div>
              ),
            },
            { label: "工具", key: "utils", children: <div>开发中</div> },
          ]}
        />
      </div>
    </ViewportPortal>
  );
}

export default MenuList;
