import request from "../request";

const updateUserInfo = (params: { userName: string; password: string }) => {
  return request.post("/role/updateUserInfo", params);
};
export { updateUserInfo };
