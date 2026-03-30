import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type NodeTypes,
} from "@xyflow/react";
import styles from "./index.module.less";
import { NODE_TYPE } from "./constants";
import useClickAddPositionInfo from "../../store/clickAddPositionInfo";
import StartNode from "./nodeComponents/startNode";
import AgentNode from "./nodeComponents/agentNode";
import EdgesComponent from "./edgeComponents";
import MenuList from "./menu";
import useNodeList, { type NodeItem } from "../../store/nodeList";
import { useEffect, useRef } from "react";
import LeftPanel from "./nodeComponents/mapPanel/leftPanel";
import RightPanel from "./nodeComponents/mapPanel/rightPanel";

const nodeTypes: Record<NODE_TYPE, React.FC<NodeItem>> = {
  [NODE_TYPE.START_NODE]: StartNode,
  [NODE_TYPE.AGENT_NODE]: AgentNode,
};

const edgeTypes = {
  workFlowEdge: EdgesComponent,
};

function WorkFlow() {
  const nodeList = useNodeList((state) => state.nodeList);
  const edgeList = useNodeList((state) => state.edgeList);
  const ref = useRef(null);
  const updateNodePosition = useNodeList((state) => state.updateNodePosition);
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeList);
  const currentMenuInfo = useClickAddPositionInfo(
    (state) => state.currentAddNodeInfo
  );
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  useEffect(() => {
    setNodes([...nodeList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeList]);

  useEffect(() => {
    setEdges([...edgeList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeList]);
  return (
    <div className={styles["draw-flow-container"]}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        ref={ref}
        onNodesChange={(changes) => {
          updateNodePosition(
            changes.filter((item) => item.type === "position")
          );
          onNodesChange(changes);
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ minZoom: 0.5, maxZoom: 1 }}
        onPaneClick={() => {
          setCurrentNodeInfo({
            currentAddNodeInfo: {},
          });
          setEdges((edges) => {
            return edges.map((item) => {
              return {
                ...item,
                data: {
                  ...item.data,
                  active: false,
                  mouseIn: false,
                },
              };
            });
          });
        }}
        attributionPosition="top-right"
        className="overview"
        nodeTypes={nodeTypes as unknown as NodeTypes}
        edgeTypes={edgeTypes}
        onEdgeClick={(e, edge) => {
          e.stopPropagation();
          setEdges((edges) => {
            return edges.map((item) => {
              return {
                ...item,
                data:
                  item.id === edge.id
                    ? {
                        ...item.data,
                        active: !item.data.active,
                        mouseIn: item.data.mouseIn,
                      }
                    : item.data,
              };
            });
          });
        }}
        onEdgeMouseEnter={(e, edge) => {
          e.stopPropagation();
          setEdges((edges) => {
            return edges.map((item) => {
              return {
                ...item,
                data:
                  item.id === edge.id
                    ? {
                        ...item.data,
                        active: item.data.active,
                        mouseIn: true,
                      }
                    : item.data,
              };
            });
          });
        }}
        onEdgeMouseLeave={(e, edge) => {
          e.stopPropagation();

          setEdges((edges) => {
            return edges.map((item) => {
              return {
                ...item,
                data:
                  item.id === edge.id
                    ? {
                        ...item.data,
                        active: item.data.active,
                        mouseIn: false,
                      }
                    : item.data,
              };
            });
          });
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <Panel position="center-left">
          <LeftPanel />
        </Panel>
        <Panel position="top-right">
          <RightPanel />
        </Panel>
        {currentMenuInfo?.position && (
          <MenuList
            position={currentMenuInfo.position}
            nodeId={currentMenuInfo.nodeInfo?.id}
            edgesInfo={currentMenuInfo?.edgeInfo}
          />
        )}
      </ReactFlow>
    </div>
  );
}

export default WorkFlow;
