/* eslint-disable @typescript-eslint/ban-types */

import { useEffect, useState } from "react";

type NotNullishValue = {};

function deeplyEqual<T extends NotNullishValue>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const usePreservedReference = <T extends NotNullishValue>(
  v: T,
  valueEqual: (a: T, b: T) => boolean = deeplyEqual,
) => {
  const [ref, setRef] = useState<T>(v);

  useEffect(() => {
    if (!valueEqual(v, ref)) {
      setRef(v);
    }
  }, [v, ref, valueEqual]);

  return ref;
};
