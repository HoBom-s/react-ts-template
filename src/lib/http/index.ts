import { Http } from "./http";

const http = new Http();

const obj = {
  get: http.get.bind(http),
  post: http.post.bind(http),
  patch: http.patch.bind(http),
  del: http.del.bind(http),
};

const { get, post, patch, del } = obj;

export { get, post, patch, del };
