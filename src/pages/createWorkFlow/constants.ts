import AgentNodeSvg from "../../assets/agentIcon.svg";
import StartNodeSvg from "../../assets/startNode.svg";
import EndNodeSvg from "../../assets/endFlowNode.svg";

enum NODE_TYPE {
  START_NODE = "START_NODE",
  AGENT_NODE = "AGENT_NODE",
  END_NODE = "END_NODE",
}

const AGENT_NODE_PREFIX = "agent-node";
const START_NODE_Id = "start";
const END_NODE_ID = "end";

const NODE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AGENT_NODE_PREFIX,
  [NODE_TYPE.START_NODE]: START_NODE_Id,
  [NODE_TYPE.END_NODE]: END_NODE_ID,
};

const NODE_TITLE_PREFIX_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "Agent",
  [NODE_TYPE.START_NODE]: "开始",
  [NODE_TYPE.END_NODE]: "结束",
};

const SOURCE_HANDLE_ID_MAP: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: "agent-handle",
  [NODE_TYPE.START_NODE]: "start",
  [NODE_TYPE.END_NODE]: "end",
};

const NODE_TYPE_ICON: Record<NODE_TYPE, string> = {
  [NODE_TYPE.AGENT_NODE]: AgentNodeSvg,
  [NODE_TYPE.START_NODE]: StartNodeSvg,
  [NODE_TYPE.END_NODE]: EndNodeSvg,
};

export {
  NODE_TYPE,
  AGENT_NODE_PREFIX,
  START_NODE_Id,
  NODE_PREFIX_MAP,
  SOURCE_HANDLE_ID_MAP,
  NODE_TITLE_PREFIX_MAP,
  NODE_TYPE_ICON,
};
