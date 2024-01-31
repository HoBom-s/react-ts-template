/* eslint-disable @typescript-eslint/no-explicit-any */

import { IS_BROWSWER } from "@/utils";

export default (function () {
  try {
    const storage = sessionStorage || {};

    return {
      setItem: (key: string, v: any) => {
        storage[key] = typeof v === "string" ? v : JSON.stringify(v);
      },
      getItem: (key: string, parse = true) => {
        if (!storage[key]) {
          return null;
        }

        const value = storage[key];

        try {
          return parse ? JSON.parse(value) : value;
        } catch (err) {
          return value;
        }
      },
      removeItem: (key: string) => {
        return delete storage[key];
      },
    };
  } catch (error) {
    if (IS_BROWSWER) {
      console.error(error);
    }

    return {
      setItem: (_key: string, _v: any) => "",
      getItem: (_key: string) => "",
      removeItem: (_key: string) => "",
    };
  }
})();
