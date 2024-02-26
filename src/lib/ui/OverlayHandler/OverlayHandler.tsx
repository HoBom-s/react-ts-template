import {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { OverlayElem, OverlayRef } from "@/lib/types";

interface Props {
  Overlay: OverlayElem;
  onExit: () => void;
}

export const OverlayHandler = forwardRef(
  ({ Overlay, onExit }: Props, ref: Ref<OverlayRef>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClose = useCallback(() => {
      setIsOpen((prev: boolean) => !prev);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          onClose: handleClose,
        };
      },
      [handleClose],
    );

    useEffect(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }, []);

    return <Overlay isOpen={isOpen} onClose={handleClose} onExit={onExit} />;
  },
);
