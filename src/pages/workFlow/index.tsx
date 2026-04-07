import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./index.module.less";

function WorkFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname.includes("/createWorkFlow");
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
          <div
            className={styles.container}
            onClick={() => {
              navigate("/workFlow/createWorkFlow", { replace: true });
            }}
          >
            创建应用
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default WorkFlow;
