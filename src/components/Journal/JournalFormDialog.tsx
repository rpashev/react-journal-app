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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../services/api";
import React, { useEffect, useContext } from "react";
import { BasicJournal } from "../../pages/JournalsList";
import SnackbarContext from "../../context/snackbar-context";
import useInput from "../../hooks/use-input";
interface Props {
  open: boolean;
  handleClose: () => void;
  journal?: BasicJournal;
  journalId?: string;
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

const JournalFormDialog = ({
  open,
  handleClose,
  journal,
  journalId,
}: Props) => {
  const {
    value: journalName,
    hasError: journalNameError,
    isValid: journalNameIsValid,
    valueChangeHandler: journalNameChangeHandler,
    inputBlurHandler: journalNameBlurHandler,
    reset: resetJournalName,
    setEnteredValue: setJournalName,
  } = useInput((value) => value.length > 0);
  const {
    value: description,
    hasError: descriptionError,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
    setEnteredValue: setDescription,
  } = useInput((value) => value.length > 0);

  const queryClient = useQueryClient();
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    if (journal) {
      setJournalName(journal.journalName);
      setDescription(journal?.description as any);
    }
  }, [journal]);

  const { isLoading, mutate } = useMutation<any, AxiosError, JournalInputState>(
    api.createJournal,
    {
      onSuccess: (data) => {
        handleClose();
        snackbarContext.showMessage("Successfully created journal!");
        queryClient.invalidateQueries({
          queryKey: ["journals"],
        });
      },
      onError: (error) => {
        const err: any = error?.response?.data;
        snackbarContext.showMessage(
          err?.message || "Error creating journal!",
          "error"
        );
      },
    }
  );

  const { isLoading: isLoadingEditing, mutate: mutateEdit } = useMutation<
    any,
    AxiosError,
    JournalEditInputState
  >(api.updateJournal, {
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      snackbarContext.showMessage("Successfully modified journal!");
    },
    onError: (error) => {
      const err: any = error?.response?.data;
      snackbarContext.showMessage(
        err?.message || "Error saving journal!",
        "error"
      );
    },
  });

  const showJournalNameError =
    journalNameError ||
    ((isLoading || isLoadingEditing) && !journalNameIsValid);
  const showDescriptionError =
    descriptionError ||
    ((isLoading || isLoadingEditing) && !descriptionIsValid);

  const handleCloseAndResetState = () => {
    if (journal) {
      setJournalName(journal.journalName);
      setDescription(journal?.description as any);
    } else {
      resetJournalName();
      resetDescription();
    }
    handleClose();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (journal && journalId) {
      const data = { journalName, description, journalId };
      mutateEdit(data);
    } else {
      const data = { journalName, description };
      mutate(data);
    }
  };

  return (
    <Fragment>
      <Dialog
        keepMounted={false}
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
          onClick={handleCloseAndResetState}
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
          {journal ? "Edit Journal" : "Create a New Journal"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: "100%",
              marginTop: 4,
            }}
          >
            <TextField
              onChange={journalNameChangeHandler}
              onBlur={journalNameBlurHandler}
              fullWidth
              label="Journal Name"
              variant="outlined"
              color="secondary"
              required
              size="small"
              value={journalName}
            />
            {showJournalNameError && (
              <Alert severity="error">Journal name is required!</Alert>
            )}
            <TextField
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              fullWidth
              label="Description"
              variant="outlined"
              color="secondary"
              required
              multiline
              size="small"
              sx={{ marginTop: "1rem" }}
              value={description}
            />
            {showDescriptionError && (
              <Alert severity="error">Journal description is required!</Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAndResetState}>Cancel</Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            disabled={
              !journalName || !description || isLoading || isLoadingEditing
            }
          >
            {isLoading || isLoadingEditing ? "Saving..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default JournalFormDialog;
