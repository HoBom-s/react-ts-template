/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useCallback, useMemo, useState } from "react";

import type { ChildrenAlias } from "@/types";

export interface CacheContextType {
  getCache: (k: string) => any;
  setCache: (k: string, value: any, ttl?: number) => void;
  removeCache: (k: string) => void;
  clearCache: () => void;
}

interface Cache {
  data: any;
  expireTime: Date;
}

interface Props {
  children: ChildrenAlias;
}

export const CacheContext = createContext<CacheContextType | null>(null);

/**
 * `CacheProvider.tsx`
 *
 * `useFetch hook`과 함께 Cache를 적용시키기 위한 ContextAPI 작성.
 * `cache-time`은 default 값이 `10000` ( 10초 )
 */
export const CacheProvider = ({ children }: Props) => {
  const [cacheMap, setCacheMap] = useState<Map<string, Cache>>(new Map());

  const getCache = useCallback(
    (k: string) => {
      const cacheData = cacheMap.get(k);

      if (!cacheData) {
        return null;
      }

      const time = new Date().getTime();

      if (time > cacheData.expireTime.getTime()) {
        setCacheMap((prev) => {
          const map = new Map(prev);

          map.delete(k);

          return map;
        });

        return null;
      }

      return cacheData;
    },
    [cacheMap],
  );

  const setCache = useCallback((k: string, v: any, ttl = 10000) => {
    setCacheMap((prev) => {
      const map = new Map(prev);

      const time = new Date();

      time.setSeconds(time.getSeconds() + ttl);

      map.set(k, {
        data: v,
        expireTime: time,
      });

      return map;
    });
  }, []);

  const removeCache = useCallback((k: string) => {
    setCacheMap((prev) => {
      const map = new Map(prev);

      map.delete(k);

      return map;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCacheMap((prev) => {
      const map = new Map(prev);

      map.clear();

      return map;
    });
  }, []);

  const values = useMemo(() => {
    return {
      getCache,
      setCache,
      removeCache,
      clearCache,
    };
  }, [clearCache, getCache, removeCache, setCache]);

  return (
    <CacheContext.Provider value={values}>{children}</CacheContext.Provider>
  );
};
