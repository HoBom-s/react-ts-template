/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from "react";

export const usePreservedCallback = <CB extends (...args: any[]) => any>(
  cb: CB,
) => {
  const callbackRef = useRef<CB>(cb);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  return useCallback(() => {
    (...args: any[]) => {
      return callbackRef.current(...args);
    };
  }, [callbackRef]);
};
