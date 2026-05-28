import type { NodeItem } from "../../../../store/nodeList";
import { NODE_TYPE } from "../../constants";

type ValidateType = "noNode" | "noEndNode" | "blankNode" | "LLMNodeNotSetApi";

const validateType: ValidateType[] = [
  "noNode",
  "noEndNode",
  "blankNode",
  "LLMNodeNotSetApi",
];

const validateMethod: Record<
  ValidateType,
  (nodeList: NodeItem[]) => string | void
> = {
  noNode: (nodeList: NodeItem[]) => {
    if (!nodeList.length) {
      return "该流程没有任何节点";
    }
  },
  noEndNode: (nodeList: NodeItem[]) => {
    if (!nodeList.find((item) => item.type === NODE_TYPE.END_NODE)) {
      return "该流程没有结束节点";
    }
  },
  blankNode: (nodeList: NodeItem[]) => {
    const realFlowNode = nodeList.filter(
      (item) => item.type !== NODE_TYPE.AGENT_NODE,
    );
    let num = 0;
    realFlowNode.forEach((item) => {
      const { data } = item;
      if (data.notParent) {
        num++;
      }
    });
    if (num !== 0) {
      return `该流程有独立存在的节点-${num}`;
    }
  },
  LLMNodeNotSetApi: (nodeList: NodeItem[]) => {
    const realFlowNode = nodeList.filter(
      (item) => item.type === NODE_TYPE.LLM_NODE,
    );
    let num = 0;
    realFlowNode.forEach((item) => {
      const { data } = item;
      if (!data.nodeConfig?.llmApiConfig) {
        num++;
      }
    });
    if (num !== 0) {
      return `存在llm节点没有配置模型-${num}`;
    }
  },
};

export const getCurrentFlowErrorInfos = (
  nodeList: NodeItem[],
): { desc: string }[] => {
  const problemItem: { desc: string }[] = [];
  validateType.forEach((item) => {
    const s = validateMethod[item](nodeList);
    if (s) {
      problemItem.push({ desc: s });
    }
  });
  return problemItem;
};
