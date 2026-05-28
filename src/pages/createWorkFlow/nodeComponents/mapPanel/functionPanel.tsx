import { Badge, Button, message, Tooltip } from "antd";
import styles from "./functionPanel.module.less";
import envSvg from "../../../../assets/envSvg.svg";
import problemListSvg from "../../../../assets/problemListSvg.svg";
import useNodeList from "../../../../store/nodeList";
import { useEffect, useState } from "react";
import classNames from "classnames";
import useAppNodeIdInfo from "../../../../store/appNodeInfo";
import { saveFlow } from "../../services";
import { useNavigate } from "react-router";
import { getUserInfo } from "../../../../utils";
import { getCurrentFlowErrorInfos } from "./utils";
import { FLOW_STATUS } from "../../constants";

interface ProblemItem {
  desc: string;
}

function FunctionPanel() {
  const nodeList = useNodeList((state) => state.nodeList);
  const [problemList, setProblemList] = useState<ProblemItem[]>([]);
  const edgeList = useNodeList((state) => state.edgeList);
  const s = useAppNodeIdInfo((s) => s.appNodeInfo);
  const navigator = useNavigate();
  const publish = async () => {
    if (!!problemList.length) {
      message.error('请先查看该流程图配置');
      return;
    }
    if (!s) {
      return;
    }
    const useInfo = getUserInfo();
    const res = await saveFlow({
      appName: s.appName,
      appType: s.appType,
      appDesc: s.appDesc,
      edgeList: edgeList,
      nodeList: nodeList,
      userName: useInfo.account,
      flowStatus: FLOW_STATUS.PUBLISH,
    });
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    message.success("发布成功");
    navigator("/myWorkFlow", { replace: true });
  };

  const saveDraf = async () => {
    if (!s) {
      return;
    }
    const useInfo = getUserInfo();
    const res = await saveFlow({
      appName: s.appName,
      appType: s.appType,
      appDesc: s.appDesc,
      edgeList: edgeList,
      nodeList: nodeList,
      userName: useInfo.account,
      flowStatus: FLOW_STATUS.DARFT,
    });
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    message.success("保存成功");
    navigator("/myWorkFlow", { replace: true });
  };

  useEffect(() => {
    setProblemList(getCurrentFlowErrorInfos(nodeList));
  }, [nodeList]);

  return (
    <div className={styles["container"]}>
      <div
        className={classNames([
          "w-8",
          "h-8.25",
          "bg--white",
          "flex",
          "justify-center",
          "items-center",
          "rounded-lg",
          styles["show-dom"],
        ])}
      >
        <img src={envSvg} className="w-6 h-6" />
      </div>
      <Badge count={problemList.length} status="error">
        <Tooltip
          color="#fff"
          arrow={false}
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
            problemList.length ? (
              <div>
                {problemList.map((item) => (
                  <div key={item.desc}>{item.desc}</div>
                ))}
              </div>
            ) : (
              <div>暂无问题</div>
            )
          }
        >
          <div
            className={classNames([
              "w-8",
              "h-8.25",
              "bg--white",
              "flex",
              "justify-center",
              "items-center",
              "rounded-lg",
              styles["show-dom"],
            ])}
          >
            <img src={problemListSvg} className="w-6 h-6" />
          </div>
        </Tooltip>
      </Badge>

      <Button type="primary" onClick={publish}>
        发布
      </Button>
      <Button type="primary" onClick={saveDraf}>
        保存草稿
      </Button>
    </div>
  );
}

export default FunctionPanel;
