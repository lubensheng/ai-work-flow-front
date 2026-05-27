import type { EdgeItem, NodeItem } from "./nodeList";

export const findBetweenNodeByCurrentNode = (
  edgeList: EdgeItem[],
  currentNode: NodeItem
): string[] => {
  const ans: string[] = [];
  const { id } = currentNode;
  edgeList.forEach((item) => {
    const { source, target } = item;
    if (source === id) {
      ans.push(item.id);
    }
    if (target === id) {
      ans.push(item.id);
    }
  });
  return ans;
};
