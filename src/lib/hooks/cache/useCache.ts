import { useContext } from "react";
import { CacheContext } from "@/lib";
import type { CacheContextType } from "@/lib";

export const useCache = () => {
  return useContext(CacheContext) as CacheContextType;
};
