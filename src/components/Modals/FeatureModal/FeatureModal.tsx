import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeUpperCase } from "../../../Helpers/communFunctions";

interface FeatureModalProps {
  onSave: (text: string, description: string) => void;
  featureType: string;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ onSave, featureType }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    onSave(text, description);
    handleCloseModal();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpenModal}>
        {makeUpperCase(`Add a new feature in ${featureType}`)}
      </Button>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{`ADD NEW ${featureType}`}</DialogTitle>

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
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FeatureModal;
