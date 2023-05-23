import React, { Fragment } from "react";
import { Close } from "@material-ui/icons";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

import { formatDate } from "../../utils/formatters";
import { Entry } from "../Journal/JournalEntriesTable";

interface Props {
  open: boolean;
  entry: Entry;
  handleClose: () => void;
}

const EntryDetailsDialog = ({ entry, open, handleClose }: Props) => {
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
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 4,
          maxWidth: "40px",
          color: "#fff",
        }}
      >
        <Close />
      </IconButton>

      <Fragment>
        {entry?.title && entry?.body && (
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              backgroundColor: "#9c27b0",
              color: "#fff",
              paddingBlock: 1,
              paddingRight: 5,
            }}
          >
            {entry?.title} from {formatDate(entry?.date)}
          </DialogTitle>
        )}

        <DialogContent
          sx={{
            fontSize: "20px",
            overflowY: "auto",
            height: "600px",
            marginTop: 4,
            overflow: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#9c27b0",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
          dangerouslySetInnerHTML={{ __html: entry?.body }}
        ></DialogContent>
      </Fragment>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryDetailsDialog;
