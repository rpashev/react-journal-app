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
import React, { useState, useContext, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, toolbarOptions } from "../../utils/quill";
import { entryContent } from "../../utils/formatters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../services/api";
import { Entry } from "../Journal/JournalEntriesTable";
import SnackbarContext from "../../context/snackbar-context";
import useInput from "../../hooks/use-input";

interface Props {
  open: boolean;
  handleClose: () => void;
  entry: Entry | null;
  journalId: string;
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

const EntryFormDialog = ({ open, handleClose, entry, journalId }: Props) => {
  const [body, setBody] = useState("");
  const [bodyIsTouched, setBodyIsTouched] = useState(false);
  const {
    value: title,
    hasError: titleError,
    isValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
    setEnteredValue: setTitle,
  } = useInput((value) => value.length > 0);

  const AlignStyle = Quill.import("attributors/style/align");
  Quill.register(AlignStyle, true);

  const queryClient = useQueryClient();
  const snackbarContext = useContext(SnackbarContext);

  const handleCloseAndClearState = () => {
    resetTitle();
    setBody("");
    setBodyIsTouched(false);
    handleClose();
  };

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
    }
  }, [entry]);

  const { isLoading, mutate } = useMutation<any, AxiosError, EntryInputState>(
    api.createEntry,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["single-journal", journalId],
        });
        handleCloseAndClearState();
        snackbarContext.showMessage("Successfully added entry!");
      },
      onError: (error) => {
        const err: any = error?.response?.data;
        snackbarContext.showMessage(
          err?.message || "Error saving entry!",
          "error"
        );
      },
    }
  );

  const { isLoading: isLoadingEditing, mutate: mutateEdit } = useMutation<
    any,
    AxiosError,
    EntryEditInputState
  >(api.editEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      handleCloseAndClearState();
      snackbarContext.showMessage("Successfully modified entry!");
    },
    onError: (error) => {
      const err: any = error?.response?.data;
      snackbarContext.showMessage(
        err?.message || "Error saving entry!",
        "error"
      );
    },
  });

  const showTitleError =
    titleError || ((isLoading || isLoadingEditing) && !titleIsValid);

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
      maxWidth="md"
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
          top: 4,
          maxWidth: "40px",
          color: "#fff",
        }}
      >
        <Close />
      </IconButton>

      <DialogTitle
        sx={{ backgroundColor: "#9c27b0", color: "#fff", paddingBlock: 1 }}
      >
        {" "}
        {entry ? "Edit Entry" : "Create a New Entry"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", height: "550px", marginTop: 4 }}>
          <TextField
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            fullWidth
            label="Entry Title"
            variant="outlined"
            color="secondary"
            required
            size="small"
            sx={{ marginBottom: "0.5rem" }}
            value={title}
          />
          {showTitleError && <Alert severity="error">Title is required!</Alert>}
          <ReactQuill
            placeholder="Share your thoughts..."
            theme="snow"
            value={body}
            modules={{ toolbar: toolbarOptions }}
            formats={formats}
            onChange={setBody}
            style={{ height: "350px" }}
            onBlur={() => setBodyIsTouched(true)}
          />
          {!entryContent(body) && bodyIsTouched && (
            <Alert sx={{ marginTop: 5 }} severity="error">
              Entry body is required!
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndClearState}>Cancel</Button>
        <Button
          disabled={
            !title || !entryContent(body) || isLoading || isLoadingEditing
          }
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
