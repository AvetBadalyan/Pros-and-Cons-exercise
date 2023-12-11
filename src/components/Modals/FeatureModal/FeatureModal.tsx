import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
}) => {
  const [featureText, setFeatureText] = React.useState(initialText);
  const [featureDescription, setFeatureDescription] =
    React.useState(initialDescription);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const features = useSelector((state: RootState) => state.featuresSlice);

  const validateFeatureText = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setErrorMessage("Required! Text cannot be empty!");
      return;
    }

    const isDuplicate = featureTypes.some((type) => {
      const duplicateInColumn = features[type].some((feature) => {
        const isSameName =
          feature.text.toLowerCase() === trimmedText.toLowerCase();
        return isEditing ? isSameName && featureId !== feature.id : isSameName;
      });

      if (duplicateInColumn) {
        setErrorMessage(`Feature already exists in ${type} column!`);
      }

      return duplicateInColumn;
    });

    if (!isDuplicate) {
      setErrorMessage("");
    }
  };

  const handleFeatureTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureText(e.target.value);
    validateFeatureText(e.target.value);
  };

  const handleFeatureDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeatureDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(featureText, featureDescription);
    onClose();
  };

  console.log(errorMessage, "errorMessage");

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

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {isEditing
            ? makeUpperCase(`Edit ${featureType}`)
            : makeUpperCase(`Add a new feature in ${featureType}`)}
        </DialogTitle>
        <DialogContent sx={{ width: "555px" }}>
          <TextField
            label="Feature Text"
            fullWidth
            margin="normal"
            value={featureText}
            onChange={handleFeatureTextChange}
            required
          />
          <TextField
            label="Feature Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={featureDescription}
            onChange={handleFeatureDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={!!errorMessage || !featureText}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeatureModal;
