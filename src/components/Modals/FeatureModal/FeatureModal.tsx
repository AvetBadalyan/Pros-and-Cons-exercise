import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, description: string) => void;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(text, description);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Add Feature
        </Typography>
        <TextField
          label="Feature Text"
          fullWidth
          margin="normal"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          label="Feature Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default FeatureModal;
