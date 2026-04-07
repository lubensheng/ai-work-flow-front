import { FormOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import styles from "../../index.module.less";
import { useReactFlow } from "@xyflow/react";
import useClickAddPositionInfo from "../../../../store/clickAddPositionInfo";

function LeftPanel() {
  const { screenToFlowPosition } = useReactFlow();
  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  return (
    <div className={styles["flow-operation-container"]}>
      <div
        className={styles.hover}
        onClick={(e) => {
          console.log(e);
          const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
          setCurrentNodeInfo({
            currentAddNodeInfo: {
              position,
              nodeInfo: undefined,
              edgeInfo: undefined,
            },
          });
        }}
      >
        <Tooltip title="添加节点">
          <PlusCircleOutlined />
        </Tooltip>
      </div>
      <div className={styles.hover}>
        <Tooltip title="添加注释">
          <FormOutlined />
        </Tooltip>
      </div>
    </div>
  );
}

export default LeftPanel;
