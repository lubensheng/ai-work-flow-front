import {
  AGENT_NODE_DRAG_HANDLE,
  START_NODE_DRAG_HANDLE,
  NODE_TYPE,
  END_NODE_DRAG_HANDLE,
  CONDITION_NODE_DRAG_HANDLE,
  ANNOTATION_DRAG_HANDLE,
} from "../pages/createWorkFlow/constants";

const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const getAppInfo = () => {
  const appInfo = localStorage.getItem("appInfo");
  return appInfo ? JSON.parse(appInfo) : null;
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
    default: {
      return undefined;
    }
  }
};

export { getUserInfo, getAppInfo, getDragHandle };
