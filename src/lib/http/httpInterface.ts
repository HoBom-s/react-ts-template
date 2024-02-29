import { AxiosRequestConfig } from "axios";

export interface HttpInterface {
  get: <Response>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<Response>;
  post: <Request, Response>(
    url: string,
    body: Request,
    config?: AxiosRequestConfig,
  ) => Promise<Response>;
  patch: <Request, Response>(
    url: string,
    body: Request,
    config?: AxiosRequestConfig,
  ) => Promise<Response>;
  del: <Response>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<Response>;
}
