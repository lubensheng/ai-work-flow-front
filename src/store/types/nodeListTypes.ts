import type { NodeChange } from "@xyflow/react";
import type { NODE_TYPE } from "../../pages/createWorkFlow/constants";
import type { Field } from "../../pages/createWorkFlow/type";

export type ConditionType = "IF" | "ELSE" | "ELSE IF";

export type ConditionRelation = "and" | "or";

export type ConditionInfo = {
  relationType: ConditionRelationType;
  conditionInfo: {
    environmentInfo: EnvironmentItem;
    conditionValue: string;
  };
};

export type Condition = {
  type: ConditionRelation;
  conditions: ConditionInfo[];
};

export type ConditionItem = {
  id: string;
  type: ConditionType;
  condition?: Condition;
  // 这里缓存一下， 其实可以通过edgeList 的 target source 去查找的，这里存储方便查找
  handleNodeId?: string;
};
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

export type NodeData = {
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

export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;

export type NodeDataKey = KeyOf<NodeData> | string;

export type NodeDataValueType = ValueOf<NodeData> | Field[];

export type NodeItem = {
  id: string;
  dragHandle?: string;
  position: { x: number; y: number };
  data: NodeData;
  type: NODE_TYPE;
};

export type EnvironmentItem = {
  key: string;
  type: string;
};

export type EnvironmentItems = EnvironmentItem[];

export enum ConditionRelationType {
  // 包含
  CONTAIN = "CONTAIN",
  // 不包含
  NOT_CONTAIN = "NOT_CONTAIN",
  // 开始是
  START_INPUT = "START_INPUT",
  // 结束是
  END_INPUT = "END_INPUT",
  // 是 等于
  EQUAL = "EQUAL",
  // 不是 不等于
  NOT_EQUAL = "NOT_EQUAL",
  // 为空
  IS_EMPTY = "IS_EMPTY",
  // 不为空
  NOT_EMPTY = "NOT_EMPTY",
}

export type State = {
  edgeId: number;
  nodeList: NodeItem[];
  edgeList: EdgeItem[];
  selectNodeInfo: NodeItem;
  currentPanelAddNode?: NodeItem;
  currentMenuAddNode?: NodeItem;
  environment: EnvironmentItems;
};

export type Actions = {
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
  updateNodeData: (
    data: NodeDataValueType,
    type: NodeDataKey,
    nodeId: string
  ) => void;
  setCurrentPanelAddNode: (node: NodeItem) => void;
  clearCurrentPanelAddNode: () => void;
  clearCurrentMenuAddNode: () => void;
  updateNodePostionByNodeId: (
    nodeId: string,
    position: { x: number; y: number }
  ) => void;
  initState: () => void;
  setNotParentIdNode: (nodeInfo: NodeItem) => void;
  connectNode: (targetId: string, sourceId: string) => void;
  deleteNode: (nodeInfo: NodeItem) => void;
  setConditionNodeByCondition: (
    id: string,
    nodeId: string,
    conditionInfo: {
      condition: EnvironmentItem;
      value: string;
      type: ConditionRelationType;
      // 当前条件的index
      index?: number;
    }
  ) => void;
};
