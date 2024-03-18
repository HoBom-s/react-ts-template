import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

import { assert } from "@/lib";

export const useSuspenseQueryFetch = <Params, Result>(
  key: string,
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<Result>,
  params: Params,
) => {
  assert(
    key !== null && key !== undefined,
    `The suspense query key must be defined ${key}`,
  );

  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [key],
    queryFn: async (): Promise<Result> => {
      const fetchResult = await fetch(params);

      return fetchResult;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
};
