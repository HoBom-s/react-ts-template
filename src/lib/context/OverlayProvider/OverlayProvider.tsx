import { Fragment, createContext, useCallback, useMemo, useState } from "react";

import { ChildrenAlias } from "@/types";

interface OverlayContextProps {
  created: (cId: string, elem: ChildrenAlias) => void;
  unmount: (cId: string) => void;
}

type OverlayContextState<K, V> = Map<K, V>;

interface OverlayProviderProps {
  children: ChildrenAlias;
}

export const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [cIds, setCIds] = useState<OverlayContextState<string, ChildrenAlias>>(
    new Map(),
  );

  const created = useCallback((cId: string, elem: ChildrenAlias) => {
    setCIds((prev: OverlayContextState<string, ChildrenAlias>) => {
      const prevMap = new Map(prev);

      prevMap.set(cId, elem);

      return prevMap;
    });
  }, []);

  const unmount = useCallback((cId: string) => {
    setCIds((prev: OverlayContextState<string, ChildrenAlias>) => {
      const prevMap = new Map(prev);

      prevMap.delete(cId);

      return prevMap;
    });
  }, []);

  const overlayMenu = useMemo(() => {
    return {
      created,
      unmount,
    };
  }, [created, unmount]);

  return (
    <OverlayContext.Provider value={overlayMenu}>
      {children}
      {[...cIds.entries()].map(([cId, child]) => {
        return <Fragment key={cId}>{child}</Fragment>;
      })}
    </OverlayContext.Provider>
  );
};
