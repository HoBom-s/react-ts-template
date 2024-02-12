import { useState } from "react";

/**
 * @example
 *      const [isOpen, handleModalStateChange] = useModal();
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalStateChange = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return { isOpen, handleModalStateChange };
};
