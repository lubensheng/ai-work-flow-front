import { Badge, Button, Tooltip } from "antd";
import styles from "./functionPanel.module.less";
import envSvg from "../../../../assets/envSvg.svg";
import problemListSvg from "../../../../assets/problemListSvg.svg";
import useNodeList from "../../../../store/nodeList";
import { NODE_TYPE } from "../../constants";
import { useEffect, useState } from "react";

interface ProblemItem {
  desc: string;
}

function FunctionPanel() {
  const nodeList = useNodeList((state) => state.nodeList);
  const [problemList, setProblemList] = useState<ProblemItem[]>([]);

  useEffect(() => {
    const problemItem: ProblemItem[] = [];
    if (!nodeList.length) {
      problemItem.push({ desc: "该流程没有任何节点" });
    }
    if (nodeList.find((item) => item.type !== NODE_TYPE.END_NODE)) {
      problemItem.push({ desc: "该流程没有结束节点" });
    }
    setProblemList(problemItem);
  }, [nodeList]);

  return (
    <div className={styles["container"]}>
      <div className="w-[32px] h-[33px] bg-[#fff]">
        <img src={envSvg} className="w-[32px] h-[33px]" />
      </div>
      <Badge count={problemList.length} status="error">
        <Tooltip
          color="#fff"
          styles={{
            root: {
              backgroundColor: "#fff",
              color: "#000",
            },
            container: {
              backgroundColor: "#fff",
              color: "#000",
            },
            arrow: {
              backgroundColor: "#fff",
              color: "#fff",
              borderColor: "#fff",
            },
          }}
          placement="bottom"
          title={
            <div>
              {problemList.map((item) => (
                <div key={item.desc}>{item.desc}</div>
              ))}
            </div>
          }
        >
          <div className="w-[32px] h-[33px] bg-[#fff]">
            <img src={problemListSvg} className="w-[32px] h-[33px]" />
          </div>
        </Tooltip>
      </Badge>

      <Button type="primary">发布</Button>
    </div>
  );
}

export default FunctionPanel;
