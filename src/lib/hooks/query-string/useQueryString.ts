/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useQueryString = (name: string) => {
  const [value, setValue] = useState<{ [key: string]: string }>({});

  const location = useLocation();
  const navigate = useNavigate();

  const { search } = location;

  useEffect(() => {
    const values = Object.fromEntries(new URLSearchParams(search));

    setValue(values);
  }, [search]);

  return {
    qsValue: value[name],
    set: (params: any[]) => {
      navigate({
        pathname: `${location.pathname}`,
        search: new URLSearchParams({ ...value, ...params }).toString(),
      });
    },
  };
};
