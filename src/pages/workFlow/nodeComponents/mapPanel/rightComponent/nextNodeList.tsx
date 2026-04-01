import { getChildrenNodeInfo } from "./utils";
import commonStyles from "./styles/common.module.less";
import styles from "./styles/nextNodeList.module.less";
import type { NodeItem } from "../../../../../store/nodeList";
import { NODE_TYPE_ICON, type NODE_TYPE } from "../../../constants";

interface ViewProps {
  childrenIds: string[];
  nodeList: NodeItem[];
  nodeType: NODE_TYPE;
}

function NextNodeList(props: ViewProps) {
  const { childrenIds, nodeList, nodeType } = props;

  return (
    <div style={{ display: "flex", marginTop: "10px", position: "relative" }}>
      <div className={styles["currentNode-icon-container"]}>
        <img
          src={NODE_TYPE_ICON[nodeType]}
          className={commonStyles["header-icon"]}
        />
      </div>
      <div className={styles["left-line"]}></div>
      <div className={styles["mid-line"]}></div>
      <div className={styles["right-line"]}></div>
      <div className={styles["right-content-container"]}>
        {getChildrenNodeInfo(childrenIds, nodeList).map((item) => (
          <div key={item.id} className={styles.item}>
            <img
              src={NODE_TYPE_ICON[item.type]}
              className={commonStyles["header-icon"]}
            />
            <div style={{ marginLeft: "10px" }}>{item.data.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextNodeList;
