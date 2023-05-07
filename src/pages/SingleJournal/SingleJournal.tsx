import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/UI/Spinner";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import JournalEntriesTable, {
  Entry,
} from "../../components/Journal/JournalEntriesTable";
import JournalEntriesFilter from "../../components/Journal/JournalEntriesFilter";
import { Fragment, useState } from "react";
import EntryFormDialog from "../../components/Entry/EntryFormDialog";
import EntryDetailsDialog from "../../components/Entry/EntryDetailsDialog";
import EntryConfirmDeleteDialog from "../../components/Entry/EntryConfirmDeleteDialog";
export interface DeleteEntryState {
  journalId: string;
  entryId: string;
}

const SingleJournal = () => {
  const { journalId } = useParams();
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["single-journal", journalId],
    () => api.getJournal(journalId)
  );

  const [searchFilter, setSearchFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severitySnackbar, setSeveritySnackbar] = useState("success");

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const queryClient = useQueryClient();

  const {
    isError: isErrorDelete,
    error: errorDelete,
    isLoading: isLoadingDelete,
    mutate,
  } = useMutation<any, AxiosError, DeleteEntryState>(api.deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      setOpenDeleteDialog(false);
      onOpenSnackbar("Successfully deleted entry!", "success");
    },
    onError: () => {
      const err: any = error?.response?.data;
      onOpenSnackbar(err?.message || "Error deleting entry!", "error");
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ marginTop: "4rem" }}>
        <Spinner />
      </Box>
    );
  } else if (isError) {
    let err: any = error?.response?.data;

    return (
      <Alert severity="error">{err?.message || "Could not load journal"}</Alert>
    );
  }

  const onOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setSelectedEntry(null);
  };
  const onOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedEntry(null);
  };

  const onOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEntry(null);
  };

  const onOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onOpenSnackbar = (message: string, severity = "success") => {
    setSnackbarMessage(message);
    setSeveritySnackbar(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleDelete = () => {
    const data = { journalId, entryId: selectedEntry?._id };
    mutate(data as any);
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          maxWidth: "95%",
          width: 950,
          margin: "3rem auto",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{ display: "flex", gap: "1rem" }}
            className="SingleJournal__buttons"
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<AddIcon />}
              onClick={onOpenAddDialog}
            >
              NEW ENTRY
            </Button>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="info"
              startIcon={<ArrowBackIcon />}
            >
              BACK
            </Button>
          </Box>
          <JournalEntriesFilter
            setSearchFilter={setSearchFilter}
            searchFilter={searchFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        </Box>
        <JournalEntriesTable
          entries={data?.data?.entries}
          searchFilter={searchFilter}
          timeFilter={timeFilter}
          onOpenDetailsDialog={onOpenDetailsDialog}
          onOpenEditDialog={onOpenEditDialog}
          onOpenDeleteDialog={onOpenDeleteDialog}
          setSelectedEntry={setSelectedEntry}
        />
      </Box>
      <EntryFormDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        entry={null}
        journalId={journalId!}
        onOpenSnackbar={onOpenSnackbar}
      />
      <EntryFormDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        entry={selectedEntry}
        journalId={journalId!}
        onOpenSnackbar={onOpenSnackbar}
      />
      <EntryDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetailsDialog}
        entry={selectedEntry!}
        journalId={journalId!}
      />
      <EntryConfirmDeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleDeleteEntry={handleDelete}
        isDeleting={isLoadingDelete}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severitySnackbar as any}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SingleJournal;
