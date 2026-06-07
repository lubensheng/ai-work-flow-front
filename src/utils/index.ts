import {
  AGENT_NODE_DRAG_HANDLE,
  START_NODE_DRAG_HANDLE,
  NODE_TYPE,
  END_NODE_DRAG_HANDLE,
  CONDITION_NODE_DRAG_HANDLE,
  ANNOTATION_DRAG_HANDLE,
  LLM_NODE_DARG_HANDLE,
} from "../pages/createWorkFlow/constants";

const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const getAppInfo = () => {
  const appInfo = localStorage.getItem("appInfo");
  return appInfo ? JSON.parse(appInfo) : null;
};

const getUrlParams = (search: string): Record<string, unknown> => {
  const params = search.indexOf("?") === 0 ? search.slice(1) : search;
  const ans: Record<string, unknown> = {};
  params.split("&").forEach((item) => {
    const [key, value] = item.split("=");
    ans[key] = decodeURIComponent(value);
  });
  return ans;
};

const getDragHandle = (type: NODE_TYPE) => {
  switch (type) {
    case NODE_TYPE.START_NODE: {
      return "." + START_NODE_DRAG_HANDLE;
    }
    case NODE_TYPE.AGENT_NODE: {
      return "." + AGENT_NODE_DRAG_HANDLE;
    }
    case NODE_TYPE.END_NODE: {
      return "." + END_NODE_DRAG_HANDLE;
    }
    case NODE_TYPE.CONDITION_NODE: {
      return "." + CONDITION_NODE_DRAG_HANDLE;
    }
    case NODE_TYPE.ANNOTATION_NODE: {
      return "." + ANNOTATION_DRAG_HANDLE;
    }
    case NODE_TYPE.LLM_NODE: {
      return "." + LLM_NODE_DARG_HANDLE;
    }
    default: {
      return undefined;
    }
  }
};

export { getUserInfo, getAppInfo, getDragHandle, getUrlParams };
