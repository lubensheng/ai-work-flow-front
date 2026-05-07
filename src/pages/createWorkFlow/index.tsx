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
import { LABEL_CONFIG, NODE_TYPE } from "./constants";
import useClickAddPositionInfo from "../../store/clickAddPositionInfo";
import StartNode from "./nodeComponents/startNode";
import AgentNode from "./nodeComponents/agentNode";
import EdgesComponent from "./edgeComponents";
import MenuList from "./menu";
import useNodeList, { type NodeItem } from "../../store/nodeList";
import { useEffect, useRef, useState } from "react";
import LeftPanel from "./nodeComponents/mapPanel/leftPanel";
import RightPanel from "./nodeComponents/mapPanel/rightPanel";
import EndNode from "./nodeComponents/endNode";
import ConditionNode from "./nodeComponents/conditionNode";
import useAppNodeIdInfo, { type AppNodeItem } from "../../store/appNodeInfo";
import RobotSvg from "../../assets/robot.svg";
import SetSvg from "../../assets/setSvg.svg";
import FlowInfoMenuSvg from "../../assets/flowInfoMenu.svg";
import SetAppNodeInfoModal from "./setAppNodeInfoModal";
import AnnotationNode from "./nodeComponents/annotationNode";
import { getAppInfo } from "../../utils";
import { useNavigate } from "react-router";

const nodeTypes: Record<NODE_TYPE, React.FC<NodeItem>> = {
  [NODE_TYPE.START_NODE]: StartNode,
  [NODE_TYPE.AGENT_NODE]: AgentNode,
  [NODE_TYPE.END_NODE]: EndNode,
  [NODE_TYPE.CONDITION_NODE]: ConditionNode,
  [NODE_TYPE.ANNOTATION_NODE]: AnnotationNode,
};

const edgeTypes = {
  workFlowEdge: EdgesComponent,
};

function CreateWorkFlow() {
  const nodeList = useNodeList((state) => state.nodeList);
  const edgeList = useNodeList((state) => state.edgeList);
  const navigation = useNavigate();
  const [appInfoWidth, setAppInfoWidth] = useState('215px');
  const ref = useRef(null);
  const [appNodeInfoProps, setAppNodeInfoProps] = useState<{
    isOpen: boolean;
    initValue?: AppNodeItem;
  }>({
    isOpen: false,
  });
  
  const appNodeInfo = useAppNodeIdInfo((state) => state.appNodeInfo);
  const currentPanelAddNode = useNodeList((state) => state.currentPanelAddNode);
  const setAppNodeInfo = useAppNodeIdInfo((state) => state.setAppNodeInfo);
  const updateNodePosition = useNodeList((state) => state.updateNodePosition);
  const clearCurrentPanelAddNode = useNodeList(
    (state) => state.clearCurrentPanelAddNode
  );
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

  useEffect(() => {
    const appInfo = getAppInfo();
    if (appInfo) {
      setAppNodeInfo({ ...appInfo });
    } else {
      navigation('/workFlow')
    }
  }, []);

  return (
    <div className={styles["draw-flow-container"]}>
      {appNodeInfo && (
        <div className={styles["app-info"]} style={{ width: appInfoWidth }}>
          <div className="p-2">
            <div className="flex justify-between items-center">
              <img src={RobotSvg} className="w-10 h-10" />
              <div
                className="cursor-pointer hover:bg-[rgb(200,206,218,0.2)] hover:rounded-[5px] w-[24px] h-[24px] flex justify-center items-center"
                onClick={() => {
                  setAppNodeInfoProps({ isOpen: true, initValue: appNodeInfo });
                }}
              >
                <img src={SetSvg} className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className={styles["app-name"]}>{appNodeInfo.appName}</div>
              <div className={styles["app-desc"]}>{appNodeInfo.appDesc}</div>
            </div>
          </div>
          <div
            className={styles['fold-panel']}
            style={{
              top: '15px',
              right: '-28px',
              zIndex: 99999999999
            }}
          >
            <img
              onClick={() => {
                setAppInfoWidth(pre => pre === '0px' ? '215px' : '0px')
              }} 
              src={FlowInfoMenuSvg}
              className="w-[24px] h-[24px] cursor-pointer"
              style={{ transform: `rotate(${appInfoWidth === '0px' ? '180' : '0'}deg)`,  }}
            />
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        ref={ref}
        ariaLabelConfig={LABEL_CONFIG}
        style={{ cursor: "pointer" }}
        noDragClassName={
          currentPanelAddNode ? styles["cursor-pointer"] : styles["cursor-grab"]
        }
        onNodesChange={(changes) => {
          setCurrentNodeInfo({
            currentAddNodeInfo: {},
          });
          updateNodePosition(
            changes.filter((item) => item.type === "position")
          );
          onNodesChange(changes);
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag
        fitViewOptions={{ minZoom: 0.5, maxZoom: 1 }}
        onPaneClick={() => {
          setCurrentNodeInfo({
            currentAddNodeInfo: {},
          });
          if (currentPanelAddNode) {
            const rectFlowDom = document.querySelector(
              ".react-flow__pane.draggable"
            ) as HTMLDivElement;
            const rectFlowNodeDom = document.querySelector(
              `.react-flow__node.draggable[data-id=${currentPanelAddNode.id}]`
            ) as HTMLDivElement;
            if (rectFlowDom?.style.cursor === "pointer" && rectFlowDom) {
              rectFlowDom.style.cursor = "grab";
            }
            if (
              rectFlowNodeDom?.style.cursor === "pointer" &&
              rectFlowNodeDom
            ) {
              rectFlowNodeDom.style.cursor = "grab";
            }
          }
          clearCurrentPanelAddNode();
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
        nodeDragThreshold={1}
        autoPanOnNodeFocus={false}
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
      <SetAppNodeInfoModal
        isOpen={appNodeInfoProps.isOpen}
        initValue={appNodeInfoProps.initValue!}
        onOk={(value) => {
          setAppNodeInfo(value);
          setAppNodeInfoProps({ isOpen: false });
        }}
        onCancel={() => {
          setAppNodeInfoProps({ isOpen: false });
        }}
      />
    </div>
  );
}

export default CreateWorkFlow;
