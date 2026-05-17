import axios from "axios";

const updateUserInfo = (params: { userName: string; password: string }) => {
  return axios.post("/role/updateUserInfo", params);
};
export { updateUserInfo };
