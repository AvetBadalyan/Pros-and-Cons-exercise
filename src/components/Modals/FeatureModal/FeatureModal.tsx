import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeUpperCase } from "../../../Helpers/communFunctions";

export interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, description: string) => void;
  featureType: string;
  isEditing?: boolean;
  initialText?: string;
  initialDescription?: string;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  featureType,
  isEditing = false,
  initialText = "",
  initialDescription = "",
}) => {
  const [text, setText] = React.useState(initialText);
  const [description, setDescription] = React.useState(initialDescription);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
      <DialogContent>
        <TextField
          label="Feature Text"
          fullWidth
          margin="normal"
          value={text}
          onChange={handleTextChange}
        />
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
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeatureModal;
