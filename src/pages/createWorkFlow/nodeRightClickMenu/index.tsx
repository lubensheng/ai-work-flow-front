import { Button, Popconfirm } from "antd";
import useClickRightMenuNodeInfo from "../../../store/clickRightMenuNodeInfo";
import styles from "./index.module.less";
import { DeleteOutlined } from "@ant-design/icons";

function NodeRightClickMenu() {
  const position = useClickRightMenuNodeInfo((s) => s.position);
  const nodeInfo = useClickRightMenuNodeInfo((s) => s.nodeInfo);
  return nodeInfo && position ? (
    <div
      className={styles.container}
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
      }}>
      <div>
        <Popconfirm title="是否删除" cancelText="取消" okText="确认">
          <Button icon={<DeleteOutlined />}>删除</Button>
        </Popconfirm>
      </div>
    </div>
  ) : undefined;
}

export default NodeRightClickMenu;
