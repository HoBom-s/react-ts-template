/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import { usePreservedCallback, usePreservedReference } from "..";

export const useDebounce = <Func extends (...args: any[]) => any>(
  cb: Func,
  wait: number,
  options: Parameters<typeof debounce>[2] = {},
) => {
  const preservedCallback = usePreservedCallback(cb);
  const preservedOptions = usePreservedReference(options);

  const debounced = useMemo(() => {
    return debounce(preservedCallback, wait, preservedOptions);
  }, [preservedCallback, preservedOptions, wait]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
};
