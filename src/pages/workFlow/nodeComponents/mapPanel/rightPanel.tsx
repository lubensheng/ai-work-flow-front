import useNodeList from "../../../../store/nodeList";
import { NODE_TYPE } from "../../constants";
import styles from "./right.module.less";
import AgentNodePanel from "./rightComponent/agentNodePanel";
import StartNodePanel from "./rightComponent/startNodePanel";
import type { ReactNode } from "react";

function RightPanel() {
  const selectNodeInfo = useNodeList((s) => s.selectNodeInfo);
  const nodeList = useNodeList((s) => s.nodeList);
  const dom: Record<NODE_TYPE, ReactNode> = {
    [NODE_TYPE.START_NODE]: (
      <StartNodePanel nodeInfo={selectNodeInfo} nodeList={nodeList} />
    ),
    [NODE_TYPE.AGENT_NODE]: <AgentNodePanel />,
  };

  return <div className={styles["container"]}>{dom[selectNodeInfo.type]}</div>;
}

export default RightPanel;
