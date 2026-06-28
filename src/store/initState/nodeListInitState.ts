import {
  END_NODE_DRAG_HANDLE,
  LLM_NODE_DARG_HANDLE,
  NODE_PREFIX_MAP,
  NODE_TYPE,
  SOURCE_HANDLE_ID_MAP,
  START_NODE_DRAG_HANDLE,
  START_NODE_Id,
} from "../../pages/createWorkFlow/constants";
import type { Field } from "../../pages/createWorkFlow/type";
import type {
  EdgeItem,
  EnvironmentItems,
  NodeItem,
} from "../types/nodeListTypes";

export const edgeIdPrefix = "edge-el";

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

export const initialEdges: EdgeItem[] = [
  {
    id: `${edgeIdPrefix}-1`,
    source: "start",
    target: `${NODE_PREFIX_MAP.LLM_NODE}-1`,
    type: "workFlowEdge",
    sourceHandle: SOURCE_HANDLE_ID_MAP.START_NODE,
    data: {
      active: false,
      mouseIn: false,
      showRelateNode: false,
      currentEdgeInfo: {
        source: "start",
        target: `${NODE_PREFIX_MAP.LLM_NODE}-1`,
      },
    },
  },
  {
    id: `${edgeIdPrefix}-2`,
    source: `${NODE_PREFIX_MAP.LLM_NODE}-1`,
    target: `${NODE_PREFIX_MAP.END_NODE}-1`,
    type: "workFlowEdge",
    sourceHandle: `${SOURCE_HANDLE_ID_MAP.LLM_NODE}-${NODE_PREFIX_MAP.LLM_NODE}-1`,
    data: {
      active: false,
      mouseIn: false,
      showRelateNode: false,
      currentEdgeInfo: {
        source: `${NODE_PREFIX_MAP.LLM_NODE}-1`,
        target: `${NODE_PREFIX_MAP.END_NODE}-1`,
      },
    },
  },
];

export const initNodeList: NodeItem[] = [
  {
    id: START_NODE_Id,
    position: { x: 0, y: 0 },
    data: {
      childrenIds: [`${NODE_PREFIX_MAP.LLM_NODE}-1`],
      label: 1,
      select: true,
      title: "开始",
      nodeConfig: {
        fields: initStartFields,
      },
    },
    dragHandle: `.${START_NODE_DRAG_HANDLE}`,
    type: NODE_TYPE.START_NODE,
  },
  {
    id: `${NODE_PREFIX_MAP.LLM_NODE}-1`,
    position: { x: 240, y: 0 },
    data: {
      childrenIds: [`${NODE_PREFIX_MAP.END_NODE}-1`],
      label: 1,
      select: false,
      title: "LLM",
    },
    dragHandle: `.${LLM_NODE_DARG_HANDLE}`,
    type: NODE_TYPE.LLM_NODE,
  },
  {
    id: `${NODE_PREFIX_MAP.END_NODE}-1`,
    position: { x: 480, y: 0 },
    data: { childrenIds: [], label: 1, select: false, title: "End" },
    dragHandle: `.${END_NODE_DRAG_HANDLE}`,
    type: NODE_TYPE.END_NODE,
  },
];

export const initEnvironment: EnvironmentItems = [
  {
    key: "preNodeInput",
    type: "string",
  },
];
