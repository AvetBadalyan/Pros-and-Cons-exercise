import React, { useEffect, useState, useRef } from "react";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeaturesState } from "../../../Store/FeatureSlice/actions/types";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./FeatureModal.scss";

export interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (featureText: string, featureDescription: string) => void;
  featureType: string;
  isEditing?: boolean;
  initialText?: string;
  initialDescription?: string;
  featureId?: string;
  featureTypes: string[];
  features: FeaturesState;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  featureType,
  isEditing = false,
  initialText = "",
  initialDescription = "",
  featureId = "",
  featureTypes,
  features,
}) => {
  const [featureText, setFeatureText] = useState(initialText);
  const [featureDescription, setFeatureDescription] =
    useState(initialDescription);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (errorMessage !== null && errorMessage !== "") {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [errorMessage]);

  const handleFeatureTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureText(e.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      validateFeatureText(e.target.value);
    }, 500);
  };

  const handleFeatureDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeatureDescription(e.target.value);
  };

  const validateFeatureText = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setErrorMessage("Text cannot be empty!");
      return;
    }

    const isDuplicate = featureTypes.some((type) => {
      const duplicateInColumn = features[type].some((feature) => {
        const isSameName =
          feature.text.toLowerCase() === trimmedText.toLowerCase();
        return isEditing ? isSameName && featureId !== feature.id : isSameName;
      });

      if (duplicateInColumn) {
        setErrorMessage(`Feature exists in ${type} column!`);
      }

      return duplicateInColumn;
    });

    if (!isDuplicate) {
      setErrorMessage("");
    }
  };

  const handleSave = () => {
    onSave(featureText, featureDescription);
    onClose();
  };

  const isSameTextAndDescription =
    initialText === featureText && initialDescription === featureDescription;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      classNames={{
        modal: "feature-modal",
        closeButton: "feature-modal-close-button",
      }}
    >
      <div className="modal-content">
        <h2>
          {isEditing
            ? makeUpperCase(`Edit ${featureType}`)
            : makeUpperCase(`Add a new feature in ${featureType}`)}
        </h2>
        <input
          type="text"
          placeholder="Feature Text"
          value={featureText}
          onChange={handleFeatureTextChange}
          required
        />
        <textarea
          placeholder="Feature Description"
          value={featureDescription}
          onChange={handleFeatureDescriptionChange}
          rows={5}
        ></textarea>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={
              !!errorMessage || isSameTextAndDescription || !featureText
            }
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FeatureModal;
