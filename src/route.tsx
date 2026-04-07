import { createBrowserRouter } from "react-router";
import AiWorkFlow from "./pages";
import Login from "./pages/login";
import CreateWorkFlow from "./pages/createWorkFlow";
import MyWorkFlow from "./pages/myWorkFlow";
import WorkFlow from "./pages/workFlow";

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
        children: [
          {
            path: "createWorkFlow",
            Component: CreateWorkFlow,
          },
        ],
      },
      {
        path: "myWorkFlow",
        Component: MyWorkFlow,
      },
    ],
  },
]);

export default router;
