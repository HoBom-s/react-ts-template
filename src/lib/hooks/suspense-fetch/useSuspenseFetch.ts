import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useAsyncError } from "..";

type PromiseStatus = "fulfilled" | "pending" | "error";

export const useSuspenseFetch = <Params, Result>(
  params: Params,
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<Result>,
  config?: AxiosRequestConfig,
) => {
  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<PromiseStatus>("pending");
  const [_result, _setResult] = useState<Result | null>(null);

  const { throwAsyncError } = useAsyncError();

  const resolve = useCallback((datas: Result) => {
    _setStatus("fulfilled");
    _setResult(datas);
  }, []);

  useEffect(() => {
    _setStatus("pending");
    _setPromise(
      fetch(params, config)
        .then(resolve)
        .catch((e) => throwAsyncError(e)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (_status === "pending" && _promise) {
    throw _promise;
  }

  return _result;
};
