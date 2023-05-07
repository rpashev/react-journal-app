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
  handleDeleteEntry: () => void;
  isDeleting: boolean;
}

const EntryConfirmDeleteDialog = ({
  open,
  handleClose,
  handleDeleteEntry,
  isDeleting = false,
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
          Delete Entry
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "1.05rem" }}>
            Are you sure you want to delete this entry?
          </Typography>
        </DialogContent>
      </Fragment>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleDeleteEntry}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryConfirmDeleteDialog;
