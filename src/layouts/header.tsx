import { useNavigate } from "react-router";
import styles from "./header.module.less";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ViewProps {
  userInfo: { account: string };
}

function Headers(props: ViewProps) {
  const { userInfo } = props;
  const navigate = useNavigate();
  const [activePathLeft, setActivePathLeft] = useState("-10px");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles["account-info"]}>
        {userInfo?.account}的工作空间
      </div>
      <div style={{ display: "flex", gap: "16px", position: "relative" }}>
        <Button
          type="link"
          style={{ color: "#101828" }}
          onClick={() => {
            setActivePathLeft("-10px");
            navigate("/workFlow");
          }}
        >
          工作流程
        </Button>
        <Button
          type="link"
          style={{ color: "#101828" }}
          onClick={(e) => {
            console.log(e.target);
            setActivePathLeft("105px");
            navigate("/myWorkFlow");
          }}
        >
          我的工作流程
        </Button>
        <div
          style={{
            transition: "left 0.3s",
            position: "absolute",
            width: "116px",
            height: "32px",
            left: activePathLeft,
            pointerEvents: "none",
            background: "#f0f6ff",
            borderRadius: "12px",
            boxShadow: " 0 2px 10px rgba(24, 144, 255, 0.08)",
            zIndex: "-1",
          }}
        ></div>
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
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={handleLogout}
                >
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
