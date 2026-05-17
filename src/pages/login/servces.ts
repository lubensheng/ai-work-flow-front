import axios from "axios";

const login = (params: { userName: string; password: string }) => {
  return axios.post("/role/regiter", params);
};

export { login };
