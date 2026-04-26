import type { NodeItem } from "../../../../../store/nodeList";

const getChildrenNodeInfo = (
  children: string[],
  nodeList: NodeItem[]
): NodeItem[] => {
  const ans: NodeItem[] = [];

  children.forEach((item) => {
    const c = nodeList.find((i) => i.id === item);
    if (c) {
      ans.push({ ...c });
    }
  });

  return ans;
};

const uuid = () => `${Date.now()}-${Math.floor(Math.random() * 999999)}`;

export { getChildrenNodeInfo, uuid };
