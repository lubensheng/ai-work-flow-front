import { useState } from "react";
import styles from "./index.module.less";
import WorkFloeSvg from "../../assets/workFlow.svg";
import DialogueSvg from "../../assets/dialogue.svg";
import classNames from "classnames";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import useAppNodeIdInfo from "../../store/appNodeInfo";

type AppType = "workFlow" | "dialogue";

function WorkFlowConfigPage() {
  const [currentType, setCurrentType] = useState<AppType>("workFlow");
  const setAppNodeInfo = useAppNodeIdInfo((s) => s.setAppNodeInfo);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const appName = Form.useWatch("appName", form);
  return (
    <div className={styles.container}>
      <div className={styles["left-container"]}>
        <div className={styles["title-container"]}>
          <span className={styles.title}>创建空白应用</span>
        </div>
        <div>
          <div className={styles["app-type-select"]}>
            <span className={styles.text}>选择应用类型</span>
          </div>
          <div className={styles["app-type-container"]}>
            <div
              className={classNames(
                styles["app-type"],
                currentType === "workFlow"
                  ? styles["app-type-selected"]
                  : styles["app-type-unselected"]
              )}
              onClick={() => {
                setCurrentType("workFlow");
              }}
            >
              <div>
                <img src={WorkFloeSvg} className={styles.icon} />
              </div>
              <div className={styles.title}>工作流</div>
              <div className={styles.desc}>面向单轮自动化任务的编排工作流</div>
            </div>
            <div
              className={classNames(
                styles["app-type"],
                currentType === "dialogue"
                  ? styles["app-type-selected"]
                  : styles["app-type-unselected"]
              )}
              onClick={() => {
                setCurrentType("dialogue");
              }}
            >
              <div>
                <img src={DialogueSvg} className={styles.icon} />
              </div>
              <div className={styles.title}>Chatflow</div>
              <div className={styles.desc}>支持记忆的复杂多轮对话工作流</div>
            </div>
          </div>
          <div className={styles["app-set-container"]}>
            <Form form={form}>
              <div className={styles.title}>应用名称</div>
              <Form.Item name="appName">
                <Input placeholder="给你的应用起个名字" />
              </Form.Item>
              <div style={{ marginBottom: "10px" }}>
                <span className={styles.title}>描述</span>{" "}
                <span style={{ color: "#676f83" }} className={styles.title}>
                  (可选)
                </span>
              </div>
              <Form.Item name="appDesc">
                <Input.TextArea placeholder="输入应用描述" />
              </Form.Item>
              <div className={styles["btn-container"]}>
                <Button
                  type="primary"
                  disabled={!appName}
                  onClick={() => {
                    setAppNodeInfo({
                      appType: currentType,
                      appName: form.getFieldValue("appName"),
                      appDesc: form.getFieldValue("appDesc"),
                    });
                    navigate("/workFlow/createWorkFlow", { replace: true });
                    localStorage.setItem('appInfo', JSON.stringify({
                      appType: currentType,
                      appName: form.getFieldValue("appName"),
                      appDesc: form.getFieldValue("appDesc")
                    }));
                  }}
                >
                  创建
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  取消
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className={styles["right-container"]}></div>
    </div>
  );
}

export default WorkFlowConfigPage;
