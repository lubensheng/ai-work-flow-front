const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const getAppInfo = () => {
  const appInfo = localStorage.getItem("appInfo");
  return appInfo ? JSON.parse(appInfo) : null;
}

export { getUserInfo, getAppInfo };
