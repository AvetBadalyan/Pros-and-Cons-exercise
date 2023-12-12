import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeaturesState } from "../../../Store/FeatureSlice/actions/types";

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

  const isSameTextInEditingMode = isEditing && featureText === initialText;

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
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(110, 109, 112)",
            color: "white",
            borderRadius: 8,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn ease-in-out 0.3s",
            "& .MuiDialogActions-root": {
              padding: "12px 24px",
            },
            "& .MuiDialogContent-root": {
              padding: "8px 24px",
              "& .MuiInputBase-root, & .MuiInputLabel-root, & .MuiFormLabel-root":
                {
                  color: "white",
                  borderRadius: 2,
                },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            },
          },
        }}
      >
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
            disabled={!!errorMessage || !featureText || isSameTextInEditingMode}
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
