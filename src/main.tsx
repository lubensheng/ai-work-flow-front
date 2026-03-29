import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./route.tsx";
import "./index.css";
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
