import { useState } from "react";
import FeatureModal, {
  FeatureModalProps,
} from "../components/Modals/FeatureModal/FeatureModal";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalController: React.FC<FeatureModalProps> = (props) => {
    return <FeatureModal {...props} isOpen={isOpen} onClose={closeModal} />;
  };

  return { isOpen, openModal, closeModal, ModalController };
};
