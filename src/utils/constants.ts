export const SUCCESS_CODE = 0;

export type HttpResult<T> = {
  code: number;
  message: string;
  data: T;
};
