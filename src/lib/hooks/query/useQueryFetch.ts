import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

import { assert } from "@/lib";

export const useQueryFetch = <Params, Result>(
  key: string,
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<Result>,
  params: Params,
) => {
  assert(
    key !== null && key !== undefined,
    `The query key must be defined ${key}`,
  );

  const { data, isLoading, isError } = useQuery({
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
