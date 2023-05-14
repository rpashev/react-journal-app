import { Close } from "@material-ui/icons";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
  prompt: string;
  title: string;
}

const ConfirmDialog = ({
  open,
  handleClose,
  handleDelete,
  isDeleting = false,
  prompt,
  title,
}: Props) => {
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          maxWidth: "40px",
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <Fragment>
        <DialogTitle
          sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "1.05rem" }}>{prompt}</Typography>
        </DialogContent>
      </Fragment>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleDelete}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
