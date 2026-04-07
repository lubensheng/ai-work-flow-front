import { create } from "zustand";
import { combine } from "zustand/middleware";
import {
  AGENT_NODE_PREFIX,
  NODE_TYPE,
  SOURCE_HANDLE_ID_MAP,
  START_NODE_Id,
} from "../pages/createWorkFlow/constants";
import type { NodeChange } from "@xyflow/react";
import type { Field } from "../pages/createWorkFlow/type";

export const initStartFields: Field[] = [
  {
    key: "sys.user_id",
    fieldType: "text",
    name: "sys.user_id",
    showName: "sys.user_id",
  },
  {
    key: "sys.app_id",
    fieldType: "text",
    name: "sys.app_id",
    showName: "sys.app_id",
  },
  {
    key: "sys.flow_name",
    fieldType: "text",
    name: "sys.flow_name",
    showName: "sys.flow_name",
  },
];

export type EdgeItem = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  type: "workFlowEdge";
  data: {
    active: boolean;
    mouseIn: boolean;
    showRelateNode: boolean;
    currentEdgeInfo: {
      source: string;
      target: string;
    };
  };
};

type NodeData = {
  childrenIds: string[];
  label: number;
  title: string;
  select: boolean;
  nodeConfig?: {
    fields: Field[];
  };
};

export type NodeItem = {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
  type: NODE_TYPE;
};

type State = {
  edgeId: number;
  nodeList: NodeItem[];
  edgeList: EdgeItem[];
  selectNodeInfo: NodeItem;
};

type Actions = {
  setNodeList: (parentNodeId: string, nodeInfo: NodeItem) => void;
  setEdgeList: (edge: EdgeItem) => void;
  getEdgeLastId: () => string;
  setNodeListByEdgesInfo: (
    currentEdgeInfo: {
      source: string;
      target: string;
      edgeId: string;
    },
    nodeInfo: NodeItem
  ) => void;
  updateNodePosition: (nodeList: NodeChange<NodeItem>[]) => void;
  getSelectNodeInfo: () => NodeItem;
  setSelectNode: (nodeId: string) => void;
  updateEdgeShowRelateNode: (nodeId?: string) => void;
};

export const edgeIdPrefix = "edge-el";

const initialEdges: EdgeItem[] = [
  {
    id: `${edgeIdPrefix}-1`,
    source: "start",
    target: "agent-node-1",
    type: "workFlowEdge",
    sourceHandle: SOURCE_HANDLE_ID_MAP.START_NODE,
    data: {
      active: false,
      mouseIn: false,
      showRelateNode: false,
      currentEdgeInfo: {
        source: "start",
        target: "agent-node-1",
      },
    },
  },
];

const initNodeList: NodeItem[] = [
  {
    id: START_NODE_Id,
    position: { x: 0, y: 0 },
    data: {
      childrenIds: [`${AGENT_NODE_PREFIX}-1`],
      label: 1,
      select: true,
      title: "开始",
      nodeConfig: {
        fields: initStartFields,
      },
    },
    type: NODE_TYPE.START_NODE,
  },
  {
    id: `${AGENT_NODE_PREFIX}-1`,
    position: { x: 240, y: 0 },
    data: { childrenIds: [], label: 1, select: false, title: "Agent" },
    type: NODE_TYPE.AGENT_NODE,
  },
];

export const nodeHeight = 60;

const subNodeInterval = 70;

const nodeWidth = 200;
const initialEdgeLength = 40;

const useNodeList = create<State & Actions>()(
  combine(
    {
      nodeList: initNodeList,
      edgeList: initialEdges,
      edgeId: 2,
      selectNodeInfo: initNodeList[0],
    },
    (set, get) => ({
      setNodeList: (parentNodeId: string, nodeInfo: NodeItem) => {
        set((state) => {
          const newNodeList = [...state.nodeList].map((item) => ({
            ...item,
            data: { ...item.data, select: false },
          }));
          const newEdgeList = [...state.edgeList];
          const parentIndex = newNodeList.findIndex(
            (item) => item.id === parentNodeId
          );
          const lastIdNum = state.edgeId;
          const newEdgeItem: EdgeItem = {
            id: `${edgeIdPrefix}-${lastIdNum}`,
            source: parentNodeId,
            target: nodeInfo.id,
            sourceHandle: "",
            type: "workFlowEdge",
            data: {
              active: false,
              mouseIn: false,
              showRelateNode: false,
              currentEdgeInfo: {
                source: parentNodeId,
                target: nodeInfo.id,
              },
            },
          };
          console.log(newEdgeItem);
          nodeInfo.data.select = true;
          if (parentIndex > -1) {
            const parentNode = newNodeList[parentIndex];
            const parentNodeChildeNum = parentNode.data.childrenIds.length;
            const lastSubNodeId =
              parentNode.data.childrenIds[parentNodeChildeNum - 1];

            newNodeList[parentIndex].data = {
              ...newNodeList[parentIndex].data,
              childrenIds: [
                ...newNodeList[parentIndex].data.childrenIds,
                nodeInfo.id,
              ],
            };
            if (lastSubNodeId) {
              const lastSubNode = newNodeList.find(
                (item) => item.id === lastSubNodeId
              )!;
              nodeInfo.position = {
                x: lastSubNode.position.x,
                y: lastSubNode.position.y + subNodeInterval,
              };
            } else {
              nodeInfo.position = {
                x: parentNode.position.x + nodeWidth + initialEdgeLength,
                y: parentNode.position.y,
              };
            }
            newNodeList.splice(parentIndex, 0, nodeInfo);
            if (parentNode.type === NODE_TYPE.START_NODE) {
              newEdgeItem.sourceHandle = SOURCE_HANDLE_ID_MAP.START_NODE;
            } else {
              newEdgeItem.sourceHandle = `${
                SOURCE_HANDLE_ID_MAP[parentNode.type]
              }-${parentNode.id}`;
            }

            newEdgeList.push({ ...newEdgeItem });
          } else {
            newNodeList.push({ ...nodeInfo });
          }
          return {
            nodeList: newNodeList,
            edgeList: newEdgeList,
            edgeId: state.edgeId + 1,
          };
        });
      },
      setNodeListByEdgesInfo(currentEdgeInfo, nodeInfo) {
        set((state) => {
          const newNodeList = [...state.nodeList].map((item) => ({
            ...item,
            data: { ...item.data, select: false },
          }));
          const newEgeList = [...state.edgeList];
          const parentNodeId = currentEdgeInfo.source;
          const childrenNodeId = currentEdgeInfo.target;
          nodeInfo.data.select = true;
          const parentNode = newNodeList.find(
            (item) => item.id === parentNodeId
          )!;
          const childrenNode = newNodeList.find(
            (item) => item.id === childrenNodeId
          )!;
          parentNode.data.childrenIds = parentNode.data.childrenIds.filter(
            (item) => item !== childrenNodeId
          );
          nodeInfo.data.childrenIds = [childrenNodeId];
          nodeInfo.position = {
            x: childrenNode.position.x,
            y: childrenNode.position.y,
          };
          childrenNode.position.x =
            childrenNode.position.x + nodeWidth + initialEdgeLength;

          // 处理线的逻辑了， 找个
          const edgeInfo = newEgeList.find(
            (item) => item.id === currentEdgeInfo.edgeId
          )!;
          edgeInfo.target = nodeInfo.id;
          edgeInfo.data.currentEdgeInfo.target = nodeInfo.id;
          const newEdgeInfo: EdgeItem = {
            id: `${edgeIdPrefix}-${state.edgeId}`,
            source: nodeInfo.id,
            target: childrenNode.id,
            sourceHandle: `${SOURCE_HANDLE_ID_MAP[nodeInfo.type]}-${
              nodeInfo.id
            }`,
            type: "workFlowEdge",
            data: {
              active: false,
              mouseIn: false,
              showRelateNode: false,
              currentEdgeInfo: {
                source: nodeInfo.id,
                target: childrenNode.id,
              },
            },
          };
          newEgeList.push(newEdgeInfo);
          newNodeList.push(nodeInfo);
          return {
            nodeList: newNodeList,
            edgeList: newEgeList,
            edgeId: state.edgeId + 1,
          };
        });
      },
      setEdgeList(edge) {
        set((pre) => ({ edgeList: [...pre.edgeList, edge] }));
      },
      getEdgeLastId() {
        const { edgeList } = get();
        const lastIdNum =
          Number(edgeList[edgeList.length - 1].id.split("-")[2]) + 1;
        return `${edgeIdPrefix}-${lastIdNum}`;
      },
      updateNodePosition(nodeList: NodeChange<NodeItem>[]) {
        if (nodeList.length) {
          set((state) => {
            const newNodeList = [...state.nodeList];
            newNodeList.forEach((item) => {
              const i = nodeList.find(
                (it) => (it as unknown as NodeItem).id === item.id
              );
              if (i) {
                item.position = { ...(i as unknown as NodeItem).position };
              }
            });
            return {
              ...state,
              newNodeList,
            };
          });
        }
      },
      getSelectNodeInfo() {
        const { nodeList } = get();
        const nodeInfo = nodeList.find((i) => i.data.select)!;
        return nodeInfo;
      },
      setSelectNode(nodeId) {
        set((pre) => ({
          ...pre,
          selectNodeInfo: pre.nodeList.find((item) => item.id === nodeId),
          nodeList: pre.nodeList.map((i) => ({
            ...i,
            data: { ...i.data, select: i.id === nodeId },
          })),
        }));
      },
      updateEdgeShowRelateNode(nodeId) {
        set((pre) => {
          const newEdgeList = [...pre.edgeList].map((i) => ({
            ...i,
            data: { ...i.data, showRelateNode: false },
          }));
          if (nodeId) {
            newEdgeList.forEach((item) => {
              if (item.source === nodeId || item.target === nodeId) {
                item.data.showRelateNode = true;
              }
            });
          }

          return {
            ...pre,
            edgeList: newEdgeList,
          };
        });
      },
    })
  )
);

export default useNodeList;
