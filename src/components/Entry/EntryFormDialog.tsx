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
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, toolbarOptions } from "../../utils/quill";
import { entryContent } from "../../utils/formatters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../services/api";
import React, { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { Entry } from "../Journal/JournalEntriesTable";

interface Props {
  open: boolean;
  handleClose: () => void;
  entry: Entry | null;
  journalId: string;
  onOpenSnackbar: (message: string, severity?: string) => void;
}

export interface EntryInputState {
  body: string;
  date: string;
  title: string;
  id: string;
}

export interface EntryEditInputState {
  body: string;
  title: string;
  entryId: string;
  journalId: string;
}

const EntryFormDialog = ({
  open,
  handleClose,
  entry,
  journalId,
  onOpenSnackbar,
}: Props) => {
  const [body, setBody] = useState(entry?.body || "");
  const [title, setTitle] = useState(entry?.title || "");

  const AlignStyle = Quill.import("attributors/style/align");
  Quill.register(AlignStyle, true);

  const queryClient = useQueryClient();

  const handleCloseAndClearState = () => {
    setTitle("");
    setBody("");
    handleClose();
  };

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
    }

    console.log(body);
  }, [entry]);

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    EntryInputState
  >(api.createEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      handleCloseAndClearState();
      onOpenSnackbar("Successfully added entry!", "success");
    },
    onError: (error) => {
      const err: any = error?.response?.data;
      onOpenSnackbar(err?.message || "Error saving entry!", "error");
    },
  });

  const {
    isError: isErrorEditing,
    error: errorEditing,
    isLoading: isLoadingEditing,
    mutate: mutateEdit,
  } = useMutation<any, AxiosError, EntryEditInputState>(api.editEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      handleCloseAndClearState();
      onOpenSnackbar("Successfully modified entry!", "success");
    },
    onError: (error) => {
      const err: any = error?.response?.data;
      onOpenSnackbar(err?.message || "Error saving entry!", "error");
    },
  });

  const handleSubmit = () => {
    if (entry !== null) {
      const data = { title, body, entryId: entry._id, journalId };
      mutateEdit(data);
    } else {
      const date = new Date().toISOString().slice(0, 10);
      const data = { title, body, date, id: journalId };
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

      <DialogTitle> {entry ? "Edit Entry" : "Create a New Entry"}</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", height: "500px", marginTop: "0.75rem" }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            label="Entry Title"
            variant="outlined"
            color="secondary"
            required
            size="small"
            sx={{ marginBottom: "0.5rem" }}
            value={title}
          />
          <ReactQuill
            placeholder="Share your thoughts..."
            theme="snow"
            value={body}
            modules={{ toolbar: toolbarOptions }}
            formats={formats}
            onChange={setBody}
            style={{ height: "350px" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndClearState}>Cancel</Button>
        <Button
          disabled={!body || !title || !entryContent(body) || isLoading}
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

export default EntryFormDialog;
