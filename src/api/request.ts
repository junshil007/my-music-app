/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-12
 */

interface IBaseResponse<T> {
  [x: string]: any;
  /** 响应码 */
  code: number;
  /** 接口耗时ms（从客户端发起请求之前开始算） */
  costAllTime: number;
  /** 接口耗时ms（从客户端发起请求到服务器接收请求） */
  costReqNetTime: number;
  /** 接口耗时ms（从服务器接收到请求开始算） */
  costTime: number;
  /** 响应报文的数据 */
  data: T;
  /** 提示语 */
  msg: string;
  /** 提示语详情,可能是错误提示堆栈 */
  msgDetail: string;
  /** 请求时间（客户端发起请求的时间） */
  reqClientTime: string;
  /** 请求时间（服务器收到客户端请求的时间） */
  reqServerTime: string;
  /** 网关调用链ID */
  traceGatewayId: string;
  /** 调用链ID */
  traceId: string;
}

import axios, { AxiosError } from "axios";
import { ElMessage, ElNotification } from "element-plus";
console.log(import.meta.env.VITE_APP_BASE, 'VITE_APP_BASE_API');

const config = {
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};




const getBaseUrl = (env: string | undefined) => {
  // return "/api";
  return ''
};

interface IParam {
  domain?: string;
  url: string;
  data: object;
  config?: object;
}

class RequestHttp {
  instance: any;

  public constructor(config: any) {
    this.instance = axios.create(config);

    this.instance.defaults.validateStatus = function () {
      return true
    }
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const token = "";
        // 请求头中携带token信息
        if (token && config.headers) {
          config.headers["Authorization"] = token;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: any) => {
        const { data } = response;
        // 登录信息失效，应跳转到登录页面，并清空本地的token
        if (data.code === 401) {
          ElMessage({
            message: "登录失效，请重新登录",
            type: "error",
            onClose: () => {
              window.location.href = `${import.meta.env.VITE_USER_SERVER}`;
            },
          });
          return Promise.reject(data);
        }

        // 全局错误信息拦截
        if (data.code && data.code !== 200) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }

        return data;
      },
      (error: AxiosError) => {
        ElMessage.error(error.message || "请求错误，请重试");
      }
    );
  }

  get<T>(param: IParam): Promise<any> {
    const url = getBaseUrl(param.domain) + param.url;
    return this.instance.get(url, { params: param.data, ...param.config });
  }

  post<T>(param: IParam): Promise<IBaseResponse<T>> {
    const url = getBaseUrl(param.domain) + param.url;
    return this.instance.post(url, param.data, { ...param.config });
  }

  request<T>(param: IParam): Promise<IBaseResponse<T>> {
    const url = getBaseUrl(param.domain) + param.url;
    const config: any = {
      url: url,
      params: param.data,
      ...param.config,
    };
    // if (param.config?.["method"].toUpperCase() === "POST") {
    //   config.data = param.data;
    // }
    config.data = param.data;
    return this.instance.request(config);
  }
}

export default new RequestHttp(config);
