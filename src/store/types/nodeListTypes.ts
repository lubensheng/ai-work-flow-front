export type ConditionType = "IF" | "ELSE" | "ELSE IF";

export type ConditionItem = {
  id: string;
  type: ConditionType;
  condition?: string;
  // 这里缓存一下， 其实可以通过edgeList 的 target source 去查找的，这里存储方便查找
  handleNodeId?: string;
};
