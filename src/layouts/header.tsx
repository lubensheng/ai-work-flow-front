import { useLocation, useNavigate } from "react-router";
import styles from "./header.module.less";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface ViewProps {
  userInfo: { account: string };
}

type Path = "workFlow" | "myWorkFlow";

function Headers(props: ViewProps) {
  const { userInfo } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState<Path>();
  useEffect(() => {
    const { pathname } = location;
    setActivePath(pathname.slice(1) as Path);
  }, [location]);
  return (
    <div className={styles["header-container"]}>
      <div className={styles["account-info"]}>{userInfo.account}的工作空间</div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button
          type={activePath === "workFlow" ? "primary" : "link"}
          onClick={() => {
            setActivePath("workFlow");
            navigate("/workFlow", { replace: true });
          }}
        >
          工作流程
        </Button>
        <Button
          type={activePath === "myWorkFlow" ? "primary" : "link"}
          onClick={() => {
            setActivePath("myWorkFlow");
            navigate("/myWorkFlow", { replace: true });
          }}
        >
          我的工作流程
        </Button>
      </div>
      <div>
        <Popover
          trigger="click"
          placement="bottomLeft"
          content={
            <div className={styles["set-account-info"]}>
              <div className={styles["account-info-container"]}>
                <div>{userInfo.account}</div>
                <div className={styles["right-account-icon"]}>
                  {userInfo.account[0]}
                </div>
              </div>
              <div
                style={{
                  marginTop: "16px",
                  height: "32px",
                  paddingLeft: "16px",
                  cursor: "pointer",
                  lineHeight: "32px",
                  borderRadius: "5px",
                }}
                className={styles.hover}
              >
                <SettingOutlined /> 账户
              </div>
              <div style={{ marginTop: "16px" }}>
                <Button type="primary" style={{ width: "100%" }}>
                  退出
                </Button>
              </div>
            </div>
          }
          arrow={false}
        >
          <div className={styles["switch-account"]}>{userInfo.account[0]}</div>
        </Popover>
      </div>
    </div>
  );
}

export default Headers;
