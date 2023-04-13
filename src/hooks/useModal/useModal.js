import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    isOpen,
    closeModal,
    openModal,
    toggleModal,
  };
};

export default useModal;