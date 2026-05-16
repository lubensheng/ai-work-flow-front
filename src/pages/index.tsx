import { useEffect, useState } from "react";
import Headers from "../layouts/header";
import { getUserInfo } from "../utils";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./base.css";

function AiWorkFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const initData = () => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      navigate("/login", { replace: true });
      setIsLogin(false);
    } else {
      setIsLogin(true);
      if (location.pathname === "/login") {
        navigate("/workFlow", { replace: true });
      } else if (location.pathname === "/") {
        navigate("/workFlow", { replace: true });
      }
    }
  };
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      {isLogin && getUserInfo() && <Headers userInfo={getUserInfo()!} />}
      <Outlet />
    </div>
  );
}

export default AiWorkFlow;
