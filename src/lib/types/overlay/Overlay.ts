export interface OverlayRef {
  onClose: () => void;
}

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

export type OverlayElem = (props: OverlayProps) => JSX.Element;
