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
    } else {
      setIsLogin(true);
    }
  };
  useEffect(() => {
    initData();
  }, [location]);

  return (
    <div>
      {isLogin && <Headers userInfo={getUserInfo()!} />}
      <Outlet />
    </div>
  );
}

export default AiWorkFlow;
