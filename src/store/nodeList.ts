import { create } from "zustand";
import { combine } from "zustand/middleware";
import {
  NODE_TYPE,
  SOURCE_HANDLE_ID_MAP,
} from "../pages/createWorkFlow/constants";
import _ from "lodash";
import type { NodeChange } from "@xyflow/react";
import type { Field } from "../pages/createWorkFlow/type";
import {
  type Actions,
  type ConditionItem,
  type State,
} from "./types/nodeListTypes";
import { findBetweenNodeByCurrentNode } from "./utils";
import {
  initEnvironment,
  initialEdges,
  initNodeList,
} from "./initState/nodeListInitState";

export const initStartFields: Field[] = [
  {
    key: "sys.user_id",
    fieldType: "text",
    name: "sys.user_id",
    showName: "sys.user_id",
    isSystemField: true,
  },
  {
    key: "sys.app_id",
    fieldType: "text",
    name: "sys.app_id",
    showName: "sys.app_id",
    isSystemField: true,
  },
  {
    key: "sys.flow_name",
    fieldType: "text",
    name: "sys.flow_name",
    showName: "sys.flow_name",
    isSystemField: true,
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
  notParent?: boolean;
  select: boolean;
  nodeConfig?: {
    // 当前节点的字段，可以用做环境变量
    fields?: Field[];
    // 条件节点的条件配置
    conditions?: ConditionItem[];
    // llm节点 模型配置
    llmApiConfig?: { id: number; modalType: string; apiKey: string };
  };
};

type ValueOf<T> = T[keyof T];

export type NodeDataValueType = ValueOf<NodeData> | Field[];

export type NodeItem = {
  id: string;
  dragHandle?: string;
  position: { x: number; y: number };
  data: NodeData;
  type: NODE_TYPE;
};

export const edgeIdPrefix = "edge-el";

export const nodeHeight = 60;

const subNodeInterval = 70;

const nodeWidth = 200;
const initialEdgeLength = 40;

const useNodeList = create<State & Actions>()(
  combine(
    {
      nodeList: initNodeList,
      edgeList: initialEdges,
      edgeId: 3,
      selectNodeInfo: initNodeList[0],
      environment: initEnvironment,
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
      updateNodeData(data, type, nodeId) {
        set((state) => {
          const newNodeList = [...state.nodeList];
          newNodeList.forEach((item) => {
            if (item.id === nodeId) {
              _.set(item.data, type, data);
            }
          });
          return {
            ...state,
            nodeList: newNodeList,
          };
        });
      },
      setCurrentPanelAddNode(node) {
        set((s) => {
          const { nodeList } = s;
          const newNodeList = [...nodeList, node];
          return {
            ...s,
            nodeList: newNodeList,
            currentPanelAddNode: node,
          };
        });
      },
      updateNodePostionByNodeId(nodeId, position) {
        set((pre) => {
          const newNodeList = [...pre.nodeList].map((item) => {
            return {
              ...item,
              position: item.id === nodeId ? { ...position } : item.position,
            };
          });
          return {
            ...pre,
            nodeList: newNodeList,
          };
        });
      },
      clearCurrentPanelAddNode() {
        set((pre) => ({
          ...pre,
          currentPanelAddNode: undefined,
        }));
      },
      clearCurrentMenuAddNode() {
        set((pre) => ({
          ...pre,
          currentMenuAddNode: undefined,
        }));
      },
      initState: () => {
        set({
          nodeList: initNodeList,
          edgeList: initialEdges,
          edgeId: 2,
          selectNodeInfo: initNodeList[0],
        });
      },
      setNotParentIdNode: (nodeInfo) => {
        const { nodeList } = get();
        nodeInfo.data.notParent = true;
        nodeInfo.data.nodeConfig = {
          conditions: [
            {
              type: "IF",
              id: "1",
            },
            {
              type: "ELSE",
              id: "2",
            },
          ],
        };
        set({
          nodeList: [...nodeList, nodeInfo],
          currentMenuAddNode: nodeInfo,
        } as State);
      },
      connectNode: (targetId, sourceId) => {
        console.log(targetId);
        console.log(sourceId);
        set((state) => {
          const newNodeList = [...state.nodeList];
          const newEdgeList = [...state.edgeList];
          const currentTargetNodeInfo = newNodeList.find(
            (item) => item.id === targetId
          );
          const currentSourceNodeInfo = newNodeList.find(
            (item) => item.id === sourceId
          );
          if (!currentTargetNodeInfo || !currentSourceNodeInfo) {
            console.error("未找到节点信息，请排查相关数据");
            return {
              ...state,
            };
          }
          if (!currentTargetNodeInfo.data?.childrenIds) {
            currentTargetNodeInfo.data.childrenIds = [];
          }
          currentTargetNodeInfo.data.childrenIds = [
            ...currentTargetNodeInfo.data.childrenIds,
            sourceId,
          ];
          const lastIdNum = state.edgeId;
          const newEdgeItem: EdgeItem = {
            id: `${edgeIdPrefix}-${lastIdNum}`,
            source: targetId,
            target: sourceId,
            sourceHandle: "",
            type: "workFlowEdge",
            data: {
              active: false,
              mouseIn: false,
              showRelateNode: false,
              currentEdgeInfo: {
                source: sourceId,
                target: targetId,
              },
            },
          };
          if (newEdgeList.find((item) => item.target === newEdgeItem.target)) {
            return {
              ...state,
            };
          }
          newEdgeList.push({
            ...newEdgeItem,
          });
          newNodeList.forEach((item) => {
            if (item.id === sourceId) {
              item.data.notParent = false;
            }
          });
          return {
            ...state,
            edgeList: newEdgeList,
            nodeList: newNodeList,
            edgeId: state.edgeId + 1,
          };
        });
      },
      deleteNode(nodeInfo) {
        set((pre) => {
          let nodeList = [...pre.nodeList];
          let edgeList = [...pre.edgeList];
          nodeList = nodeList.filter((item) => item.id !== nodeInfo.id);
          nodeList.forEach((node) => {
            if (node.data.childrenIds) {
              node.data.childrenIds = node.data.childrenIds.filter(
                (item) => item !== nodeInfo.id
              );
            }
          });
          const needList = findBetweenNodeByCurrentNode(edgeList, nodeInfo);
          edgeList = edgeList.filter((item) => !needList.includes(item.id));
          return {
            ...pre,
            nodeList,
            edgeList,
          };
        });
      },
      setConditionNodeByCondition(id, nodeId, conditionInfo) {
        console.log(id);
        console.log(nodeId);
        console.log(conditionInfo);
        set((pre) => {
          const { index } = conditionInfo;
          const oldNodeList = [...pre.nodeList];
          oldNodeList.forEach((item) => {
            if (item.id === nodeId) {
              const {
                data: { nodeConfig },
              } = item;
              if (nodeConfig) {
                const { conditions } = nodeConfig;
                conditions?.forEach((item) => {
                  if (item.id === id) {
                    if (!item.condition) {
                      item.condition = {
                        type: "and",
                        conditions: [
                          {
                            conditionInfo: {
                              environmentInfo: conditionInfo.condition,
                              conditionValue: conditionInfo.value,
                            },
                            relationType: conditionInfo.type,
                          },
                        ],
                      };
                    } else {
                      if (index) {
                        item.condition.conditions[index] = {
                          conditionInfo: {
                            environmentInfo: conditionInfo.condition,
                            conditionValue: conditionInfo.value,
                          },
                          relationType: conditionInfo.type,
                        };
                      } else {
                        item.condition.conditions = [
                          ...item.condition.conditions,
                          {
                            conditionInfo: {
                              environmentInfo: conditionInfo.condition,
                              conditionValue: conditionInfo.value,
                            },
                            relationType: conditionInfo.type,
                          },
                        ];
                      }
                    }
                  }
                });
              }
            }
          });

          return {
            ...pre,
            nodeList: [...oldNodeList],
          };
        });
      },
    })
  )
);

export default useNodeList;
