import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import Close from "@material-ui/icons/Close";
import { Fragment, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../services/api";
import React, { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { BasicJournal } from "../../pages/JournalsList/JournalsList";

interface Props {
  open: boolean;
  handleClose: () => void;
  journal?: BasicJournal;
  //   onOpenSnackbar: (message: string, severity?: string) => void;
}

export interface JournalInputState {
  journalName: string;
  description: string;
}

export interface JournalEditInputState {
  journalName: string;
  description: string;
  journalId: string;
}

const JournalFormDialog = ({ open, handleClose, journal }: Props) => {
  const [description, setDescription] = useState(journal?.description || "");
  const [journalName, setJournalName] = useState(journal?.journalName || "");

  const queryClient = useQueryClient();

  const handleCloseAndClearState = () => {
    setJournalName("");
    setDescription("");
    handleClose();
  };

  useEffect(() => {
    if (journal) {
      setJournalName(journal.journalName);
      setDescription(journal?.description as any);
    }
  }, [journal]);

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    JournalInputState
  >(api.createJournal, {
    onSuccess: (data) => {
      console.log(data);
      handleCloseAndClearState();
      //   onOpenSnackbar("Successfully added entry!", "success");
    },
    onError: (error) => {
      console.log(error);
      const err: any = error?.response?.data;
      //   onOpenSnackbar(err?.message || "Error saving entry!", "error");
    },
  });

  const {
    isError: isErrorEditing,
    error: errorEditing,
    isLoading: isLoadingEditing,
    mutate: mutateEdit,
  } = useMutation<any, AxiosError, JournalEditInputState>(api.updateJournal, {
    onSuccess: () => {
      handleCloseAndClearState();
      //   onOpenSnackbar("Successfully modified entry!", "success");
    },
    onError: (error) => {
      const err: any = error?.response?.data;
      //   onOpenSnackbar(err?.message || "Error saving entry!", "error");
    },
  });

  const handleSubmit = () => {
    if (journal !== null) {
      const data = { journalName, description, journalId: journal?.id! };
      mutateEdit(data);
    } else {
      const data = { journalName, description };
      mutate(data);
    }
  };

  return (
    <Dialog
      keepMounted={false}
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

      <DialogTitle>
        {" "}
        {journal ? "Edit Journal" : "Create a New Journal"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", height: "500px", marginTop: "0.75rem" }}>
          <TextField
            onChange={(e) => setJournalName(e.target.value)}
            fullWidth
            label="Journal Name"
            variant="outlined"
            color="secondary"
            required
            size="small"
            sx={{ marginBottom: "0.5rem" }}
            value={journalName}
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            label="Description"
            variant="outlined"
            color="secondary"
            required
            size="small"
            sx={{ marginBottom: "0.5rem" }}
            value={description}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndClearState}>Cancel</Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          type="submit"
        >
          {isLoading || isLoadingEditing ? "Saving..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JournalFormDialog;
