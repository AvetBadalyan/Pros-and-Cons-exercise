import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

export interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, description: string) => void;
  featureType: string;
  isEditing?: boolean;
  initialText?: string;
  initialDescription?: string;
  featureId?: string;
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
}) => {
  const [text, setText] = React.useState(initialText);
  const [description, setDescription] = React.useState(initialDescription);
  const [errorMessage, setErrormessage] = useState("");
  const feats = useSelector((state: RootState) => state.featuresSlice);

  const validateTextInput = (textInput: string) => {
    const trimmedText = textInput.trim();
    if (!trimmedText) {
      setErrormessage("Required! Text can not be empty!");
    } else {
      const featureAlreadyExists = feats[featureType].some((feature) => {
        const isSameName =
          feature.text.toLowerCase() === trimmedText.toLowerCase();
        return isEditing ? isSameName && featureId !== feature.id : isSameName;
      });
      featureAlreadyExists
        ? setErrormessage("Feature Already exists!")
        : setErrormessage("");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    validateTextInput(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(text, description);
    onClose();
  };

  return (
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
          value={text}
          onChange={handleTextChange}
          required
        />
        {errorMessage && (
          <Box
            sx={{
              width: "100%",
              border: "1px solid red",
              padding: "8px",
              boxSizing: "border-box",
              // display: "inline-block",
            }}
          >
            Error: {errorMessage}
          </Box>
        )}

        <TextField
          label="Feature Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={!!errorMessage || !text}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeatureModal;
