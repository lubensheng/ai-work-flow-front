import { createBrowserRouter } from "react-router";
import AiWorkFlow from "./pages";
import Login from "./pages/login";
import WorkFlow from "./pages/workFlow";
import MyWorkFlow from "./pages/myWorkFlow";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AiWorkFlow,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "workFlow",
        Component: WorkFlow,
      },
      {
        path: "myWorkFlow",
        Component: MyWorkFlow,
      },
    ],
  },
]);

export default router;
