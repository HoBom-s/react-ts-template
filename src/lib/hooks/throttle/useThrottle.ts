/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo } from "react";
import throttle from "lodash.throttle";

import { usePreservedCallback, usePreservedReference } from "..";

export const useThrottle = <Func extends (...args: any[]) => any>(
  cb: Func,
  wait: number,
  options: Parameters<typeof throttle>[2] = {},
) => {
  const preservedCallback = usePreservedCallback(cb);
  const preservedOptions = usePreservedReference(options);

  const throttled = useMemo(() => {
    return throttle(preservedCallback, wait, preservedOptions);
  }, [preservedCallback, preservedOptions, wait]);

  useEffect(() => {
    return () => {
      throttled.cancel();
    };
  }, [throttled]);

  return throttled;
};
