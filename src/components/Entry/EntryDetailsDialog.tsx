import React, { Fragment, useState } from "react";
import { Close } from "@material-ui/icons";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Alert,
  Button,
  DialogActions,
} from "@mui/material";

import { formatDate } from "../../utils/formatters";
import { Entry } from "../Journal/JournalEntriesTable";

interface Props {
  open: boolean;
  entry: Entry;
  journalId: string;
  handleClose: () => void;
}

const EntryDetailsDialog = ({ entry, journalId, open, handleClose }: Props) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleCloseAndClearState = () => {
    handleClose();
    setBody("");
    setTitle("");
    setDate("");
  };

  return (
    <Dialog
      maxWidth="lg"
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
        size="medium"
        onClick={handleCloseAndClearState}
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
        {entry?.title && entry?.body && (
          <DialogTitle
            sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}
          >
            {entry?.title} from {formatDate(entry?.date)}
          </DialogTitle>
        )}

        <DialogContent
          sx={{ fontSize: "20px", minHeight: "500px" }}
          dangerouslySetInnerHTML={{ __html: entry?.body }}
        ></DialogContent>
      </Fragment>

      <DialogActions>
        <Button onClick={handleCloseAndClearState}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryDetailsDialog;
