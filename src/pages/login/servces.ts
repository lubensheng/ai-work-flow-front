import request from "../../request";

const login = (params: { userName: string; password: string }) => {
  return request.post("/role/regiter", params);
};

export { login };
