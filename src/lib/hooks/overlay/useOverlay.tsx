import { useContext, useEffect, useMemo, useRef } from "react";

import {
  OverlayContext,
  OverlayHandler,
  OverlayElem,
  OverlayRef,
  generateUid,
} from "@/lib";

/**
 * `useOverlay.tsx`
 *
 * Overlay Hook
 * 별도의 Modal을 사용하는데 있어서 `useModal()` hook을 사용해도 됨.
 *
 * @example
 *      1. 사용하고자 하는 Root 컴포넌트에 `OverlayProvider`를 셋팅.
 *      2. `useOverlay()`를 호출.
 *              const { onOpen } = overlay;
 *
 *              onOpen(({ isOpen, onClose }) => {
 *                  return (
 *                      <Modal
 *                          isOpen={isOpen}
 *                          title="Modal title"
 *                          content={<Info title="Toast" text="Toast content" />}
 *                          footer={{
 *                              cancel: {
 *                                  label: "Cancel",
 *                              },
 *                              confirm: {
 *                                  label: "Confirm",
 *                                  onClick: handleModalStateChange,
 *                              },
 *                          }}
 *                          close={handleModalStateChange}
 *                      />
 *                  );
 *              });
 */
export const useOverlay = () => {
  const overlayContext = useContext(OverlayContext);

  if (!overlayContext) {
    throw new Error("over lay hook must be exist but got null !");
  }

  const { created, unmount } = overlayContext;

  const overlayRef = useRef<OverlayRef | null>(null);

  if (!overlayRef) {
    throw new Error("overlay ref must be exist but got null !");
  }

  const overlayUid: string = generateUid();

  useEffect(() => {
    return () => {
      unmount(overlayUid);
    };
  }, [unmount, overlayUid]);

  return useMemo(() => {
    return {
      onOpen: (Overlay: OverlayElem) => {
        created(
          overlayUid,
          <OverlayHandler
            key={generateUid()}
            ref={overlayRef}
            Overlay={Overlay}
            onExit={() => unmount(overlayUid)}
          />,
        );
      },

      onClose: () => {
        overlayRef.current?.onClose();
      },

      onExit: () => {
        unmount(overlayUid);
      },
    };
  }, [overlayUid, created, unmount]);
};
