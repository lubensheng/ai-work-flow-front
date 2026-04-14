import AgentNodeSvg from "../../assets/agentIcon.svg";
import StartNodeSvg from "../../assets/startNode.svg";
import EndNodeSvg from "../../assets/endFlowNode.svg";
import ConditionSvg from "../../assets/condition.svg";

enum NODE_TYPE {
  START_NODE = "START_NODE",
  AGENT_NODE = "AGENT_NODE",
  END_NODE = "END_NODE",
  CONDITION_NODE = "CONDITION_NODE",
}

const AGENT_NODE_PREFIX = "agent-node";
const START_NODE_Id = "start";
const END_NODE_ID = "end";
const CONDITION_NODE_PREFIX = "condition-node";

const NODE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AGENT_NODE_PREFIX,
  [NODE_TYPE.START_NODE]: START_NODE_Id,
  [NODE_TYPE.END_NODE]: END_NODE_ID,
  [NODE_TYPE.CONDITION_NODE]: CONDITION_NODE_PREFIX,
};

const NODE_TITLE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "Agent",
  [NODE_TYPE.START_NODE]: "开始",
  [NODE_TYPE.END_NODE]: "结束",
  [NODE_TYPE.CONDITION_NODE]: "",
};

const SOURCE_HANDLE_ID_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "agent-handle",
  [NODE_TYPE.START_NODE]: "start",
  [NODE_TYPE.END_NODE]: "end",
  [NODE_TYPE.CONDITION_NODE]: "condition-handle",
};

const NODE_TYPE_ICON: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AgentNodeSvg,
  [NODE_TYPE.START_NODE]: StartNodeSvg,
  [NODE_TYPE.END_NODE]: EndNodeSvg,
  [NODE_TYPE.CONDITION_NODE]: ConditionSvg,
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
};
