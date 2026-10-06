import type { NodeItem } from "../../../../store/nodeList";
import { NODE_TYPE } from "../../constants";

type ValidateType = "noNode" | "noEndNode" | "blankNode" | "LLMNodeNotSetApi" | "conditionNodeNotNode";

const validateType: ValidateType[] = [
  "noNode",
  "noEndNode",
  "blankNode",
  "LLMNodeNotSetApi",
];

const validateMethod: Record<
  ValidateType,
  (nodeList: NodeItem[]) => string | string[] | void
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
      (item) => item.type !== NODE_TYPE.ANNOTATION_NODE
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
      (item) => item.type === NODE_TYPE.LLM_NODE
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
  conditionNodeNotNode: (nodeList: NodeItem[]) => {
    const conditionNodeList = nodeList.filter(node => node.type === NODE_TYPE.CONDITION_NODE);
    if (!conditionNodeList.length) {
      return;
    }
   
    const msg: string[] = [];
    conditionNodeList.forEach(item => {
      const { data: { title, nodeConfig } } = item;
      if (!nodeConfig?.conditions) {
        msg.push(`${title}没有配置条件`);
      }
      if (!nodeConfig?.conditions?.some(it => !it.handleNodeId || it.handleNodeId?.length === 0)) {
        msg.push(`${title}条件分支没有配置执行节点`);
      }
      if (!nodeConfig?.conditions?.some(it => it.condition?.conditions.find(i => !i.conditionInfo.conditionValue))) {
        msg.push(`${title}条件分支没有配置条件值`);
      }
    })
    return msg.length ? msg : undefined;
  }
};

export const getCurrentFlowErrorInfos = (
  nodeList: NodeItem[]
): { desc: string }[] => {
  const problemItem: { desc: string }[] = [];
  validateType.forEach((item) => {
    const s = validateMethod[item](nodeList);
    if (typeof s === 'string') {
      problemItem.push({ desc: s });
    } else if (Array.isArray(s)) {
      s.forEach(item => {
        problemItem.push({ desc: item });
      });
    }
  });
  return problemItem;
};
