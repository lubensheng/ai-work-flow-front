import AgentNodeSvg from "../../assets/agentIcon.svg";
import StartNodeSvg from "../../assets/startNode.svg";
import EndNodeSvg from "../../assets/endFlowNode.svg";
import ConditionSvg from "../../assets/condition.svg";

enum NODE_TYPE {
  START_NODE = "START_NODE",
  AGENT_NODE = "AGENT_NODE",
  END_NODE = "END_NODE",
  CONDITION_NODE = "CONDITION_NODE",
  ANNOTATION_NODE = "ANNOTATION_NODE",
}

const AGENT_NODE_PREFIX = "agent-node";
const START_NODE_Id = "start";
const END_NODE_ID = "end";
const CONDITION_NODE_PREFIX = "condition-node";
const ANNOTATION_NODE_PREFIX = "annotation-node";

const NODE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AGENT_NODE_PREFIX,
  [NODE_TYPE.START_NODE]: START_NODE_Id,
  [NODE_TYPE.END_NODE]: END_NODE_ID,
  [NODE_TYPE.CONDITION_NODE]: CONDITION_NODE_PREFIX,
  [NODE_TYPE.ANNOTATION_NODE]: ANNOTATION_NODE_PREFIX,
};

const NODE_TITLE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "Agent",
  [NODE_TYPE.START_NODE]: "开始",
  [NODE_TYPE.END_NODE]: "结束",
  [NODE_TYPE.CONDITION_NODE]: "",
  [NODE_TYPE.ANNOTATION_NODE]: "",
};

const SOURCE_HANDLE_ID_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "agent-handle",
  [NODE_TYPE.START_NODE]: "start",
  [NODE_TYPE.END_NODE]: "end",
  [NODE_TYPE.CONDITION_NODE]: "condition-handle",
  [NODE_TYPE.ANNOTATION_NODE]: "annotation-handle",
};

const NODE_TYPE_ICON: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AgentNodeSvg,
  [NODE_TYPE.START_NODE]: StartNodeSvg,
  [NODE_TYPE.END_NODE]: EndNodeSvg,
  [NODE_TYPE.CONDITION_NODE]: ConditionSvg,
  [NODE_TYPE.ANNOTATION_NODE]: "",
};

const LABEL_CONFIG = {
  "controls.zoomIn.ariaLabel": "放大",
  "controls.zoomOut.ariaLabel": "缩小",
  "controls.fitView.ariaLabel": "全屏",
  "controls.interactive.ariaLabel": "交互开关",
};

const ANNOTATION_BG_COLOR = [
  "#d1e9ff",
  "#cff9fe",
  "#dcfae6",
  "#fef7c3",
  "#fce7f6",
  "#ece9fe",
];

const ANNOTATION_DRAG_HANDLE = "ANNOTATION_DRAG_HANDLE";
const START_NODE_DRAG_HANDLE = "START_NODE_DRAG_HANDLE";
const AGENT_NODE_DRAG_HANDLE = "AGENT_NODE_DRAG_HANDLE";
const END_NODE_DRAG_HANDLE = "END_NODE_DRAG_HANDLE";
const CONDITION_NODE_DRAG_HANDLE = "CONDITION_NODE_DRAG_HANDLE";
const ANNOTATION_FONT_SIZE = [
  {
    label: "小",
    value: "12px",
  },
  {
    label: "中",
    value: "14px",
  },
  {
    label: "大",
    value: "16px",
  },
];

const ANNOTATION_FONT_SIZE_LABEL: Record<string, string> = {
  "12px": "小",
  "14px": "中",
  "16px": "大",
};

export {
  NODE_TYPE,
  AGENT_NODE_PREFIX,
  START_NODE_Id,
  NODE_PREFIX_MAP,
  SOURCE_HANDLE_ID_MAP,
  NODE_TITLE_PREFIX_MAP,
  NODE_TYPE_ICON,
  CONDITION_NODE_PREFIX,
  LABEL_CONFIG,
  ANNOTATION_BG_COLOR,
  ANNOTATION_DRAG_HANDLE,
  ANNOTATION_FONT_SIZE,
  ANNOTATION_FONT_SIZE_LABEL,
  START_NODE_DRAG_HANDLE,
  AGENT_NODE_DRAG_HANDLE,
  END_NODE_DRAG_HANDLE,
  CONDITION_NODE_DRAG_HANDLE
};
