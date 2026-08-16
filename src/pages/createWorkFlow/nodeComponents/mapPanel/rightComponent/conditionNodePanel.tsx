import { Tabs } from "antd";
import ConditionList from "./conditionList";
import type { NodeItem } from "../../../../../store/nodeList";
import SetNextNodeByCondition from "./setNextNodeByCondition";
import PublicNodeBaseSetHeader from "./publicNodeBaseSetHeader";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function ConditionNodePanel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  return (
    <div>
      <PublicNodeBaseSetHeader nodeInfo={nodeInfo} nodeList={nodeList} />
      <div style={{ padding: "0 16px" }}>
        <Tabs
          items={[
            {
              label: "设置",
              key: "setting",
              children: (
                <div>
                  <div>
                    <ConditionList nodeInfo={nodeInfo} nodeList={nodeList} />
                  </div>
                  <div className="mt-[10px] border-t border-gray-200">
                    <SetNextNodeByCondition
                      nodeInfo={nodeInfo}
                      nodeList={nodeList}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ConditionNodePanel;
