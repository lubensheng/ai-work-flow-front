import axios from 'axios'
import { getUserInfo } from './utils'
import { message, notification } from 'antd';

export type CommonRes = {
  code: number;
}

export enum HttpCode {
  // 成功
  SUCCESS_CODE = 0,
  // 失败
  ERROR_CODE =  -1,
  // 成功但是没有数据
  NOT_DATA_CODE = 2
}

const request = axios.create()

request.interceptors.request.use(
  (config) => {
    const userInfo = getUserInfo();
    if (userInfo) {
      console.log(userInfo.account)
      config.headers['user-Name'] = encodeURIComponent(userInfo.account);
    }
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code === HttpCode.ERROR_CODE) {
    message.error(data.message);
  }
  return response;
}, err => {
  notification.error({
    title: err.message
  })
})

export default request;