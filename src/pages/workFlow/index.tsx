import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./index.module.less";
import AddProcessSvg from "../../assets/addProcess.svg";

function WorkFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname !== "/workFlow";
  return (
    <>
      {!isCreatePage && (
        <div
          style={{
            backgroundColor: "#f2f4f7",
            height: "calc(100vh - 57px)",
            padding: "20px",
          }}
        >
          <div className={styles.container}>
            <div className={styles.title}>创建应用</div>
            <div
              className={styles["create-item"]}
              onClick={() => {
                navigate("/workFlow/workFlowConfigPage");
              }}
            >
              <img src={AddProcessSvg} className={styles.icon} />{" "}
              <span className={styles.text}>创建空白应用</span>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default WorkFlow;
