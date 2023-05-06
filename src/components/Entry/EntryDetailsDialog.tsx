import React from "react";
import { Close } from "@material-ui/icons";
import { Dialog, IconButton, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  entryId: string | null;
  journalId: string;
  handleClose: () => void;
}

const EntryDetailsDialog = ({
  entryId,
  journalId,
  open,
  handleClose,
}: Props) => {
  return (
    <Dialog
      maxWidth="xl"
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
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogTitle>View Entry {entryId}</DialogTitle>
    </Dialog>
  );
};

export default EntryDetailsDialog;
