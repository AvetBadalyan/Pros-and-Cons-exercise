import { useState, useCallback } from "react";
import FeatureModal, {
  FeatureModalProps,
} from "../components/Modals/FeatureModal/FeatureModal";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ModalController: React.FC<FeatureModalProps> = (props) => {
    return <FeatureModal {...props} isOpen={isOpen} onClose={closeModal} />;
  };

  return { isOpen, openModal, closeModal, ModalController };
};
