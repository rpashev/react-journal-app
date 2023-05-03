import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import Close from "@material-ui/icons/Close";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, toolbarOptions } from "../../utils/quill";
import { entryContent } from "../../utils/formatters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../services/api";

interface Props {
  open: boolean;
  handleClose: () => void;
  journalId: string;
}

export interface EntryInputState {
  body: string;
  date: string;
  title: string;
  id: string;
}

const EntryFormDialog = ({ open, handleClose, journalId }: Props) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const AlignStyle = Quill.import("attributors/style/align");
  Quill.register(AlignStyle, true);

  const queryClient = useQueryClient();

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    EntryInputState
  >(api.createEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      handleClose();
      setBody("");
      setTitle("");
    },
  });

  const handleSubmit = () => {
    const date = new Date().toISOString().slice(0, 10);
    const data = { title, body, date, id: journalId };
    mutate(data);
  };

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
      <DialogTitle>Create a New Entry</DialogTitle>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!body || !title || !entryContent(body) || isLoading}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          type="submit"
        >
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryFormDialog;
