import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/UI/Spinner";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import JournalEntriesTable, {
  Entry,
} from "../../components/Journal/JournalEntriesTable";
import JournalEntriesFilter from "../../components/Journal/JournalEntriesFilter";
import { useState, useContext } from "react";
import EntryFormDialog from "../../components/Entry/EntryFormDialog";
import EntryDetailsDialog from "../../components/Entry/EntryDetailsDialog";
import JournalFormDialog from "../../components/Journal/JournalFormDialog";
import ConfirmDialog from "../../components/UI/ConfirmDialog";
import SnackbarContext from "../../context/snackbar-context";
export interface DeleteEntryState {
  journalId: string;
  entryId: string;
}

export interface DeleteJournalState {
  journalId: string;
}

const SingleJournal = () => {
  const { journalId } = useParams();
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["single-journal", journalId],
    () => api.getJournal(journalId)
  );

  const navigate = useNavigate();
  const snackbarContext = useContext(SnackbarContext);

  const [searchFilter, setSearchFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteEntryDialog, setOpenDeleteEntryDialog] = useState(false);
  const [openDeleteJournalDialog, setOpenDeleteJournalDialog] = useState(false);
  const [openEditJournalDialog, setOpenEditJournalDialog] = useState(false);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const queryClient = useQueryClient();

  const { isLoading: isDeletingEntry, mutate } = useMutation<
    any,
    AxiosError,
    DeleteEntryState
  >(api.deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single-journal", journalId],
      });
      setOpenDeleteEntryDialog(false);
      snackbarContext.showMessage("Succesfully deleted entry!");
    },
    onError: () => {
      const err: any = error?.response?.data;
      snackbarContext.showMessage(
        err?.message || "Error deleting entry!",
        "error"
      );
    },
  });
  const { isLoading: isDeletingJournal, mutate: mutateDeleteJournal } =
    useMutation<any, AxiosError, DeleteJournalState>(api.deleteJournal, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["journals"],
        });
        setOpenDeleteJournalDialog(false);
        navigate("/journals");
        snackbarContext.showMessage("Succesfully deleted journal!");
      },
      onError: () => {
        const err: any = error?.response?.data;
        snackbarContext.showMessage(
          err?.message || "Error deleting journal!",
          "error"
        );
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

  const onOpenDeleteEntryDialog = () => {
    setOpenDeleteEntryDialog(true);
  };

  const onOpenDeleteJournalDialog = () => {
    setOpenDeleteJournalDialog(true);
  };

  const handleCloseDeleteEntryDialog = () => {
    setOpenDeleteEntryDialog(false);
  };
  const handleCloseDeleteJournalDialog = () => {
    setOpenDeleteJournalDialog(false);
  };

  const onOpenEditJournalDialog = () => {
    setOpenEditJournalDialog(true);
  };

  const handleCloseEditJournalDialog = () => {
    setOpenEditJournalDialog(false);
  };

  const handleDeleteEntry = () => {
    const data = { journalId, entryId: selectedEntry?._id };
    mutate(data as any);
  };

  const handleDeleteJournal = () => {
    const data = { journalId };
    mutateDeleteJournal(data as any);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        gap: "4rem",
        flexWrap: "wrap",
        paddingBlock: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          maxWidth: "95%",
          width: 950,
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
          onOpenDeleteDialog={onOpenDeleteEntryDialog}
          setSelectedEntry={setSelectedEntry}
        />
      </Box>
      <Card sx={{ width: "350px", maxWidth: "95%" }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant="h5" marginBottom={2}>
            {data?.data?.journalName}
          </Typography>
          <Typography variant="body2">{data?.data?.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            aria-label="edit"
            size="large"
            sx={{ width: "50px", height: "50px" }}
            onClick={onOpenEditJournalDialog}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{ width: "50px", height: "50px" }}
            onClick={onOpenDeleteJournalDialog}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
      <EntryFormDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        entry={null}
        journalId={journalId!}
      />
      <EntryFormDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        entry={selectedEntry}
        journalId={journalId!}
      />
      <EntryDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetailsDialog}
        entry={selectedEntry!}
        journalId={journalId!}
      />

      <ConfirmDialog
        open={openDeleteEntryDialog}
        handleClose={handleCloseDeleteEntryDialog}
        handleDelete={handleDeleteEntry}
        isDeleting={isDeletingEntry}
        title="Delete entry"
        prompt="Are you sure you want to delete this entry?"
      />
      <ConfirmDialog
        open={openDeleteJournalDialog}
        handleClose={handleCloseDeleteJournalDialog}
        handleDelete={handleDeleteJournal}
        isDeleting={isDeletingJournal}
        title="Delete journal"
        prompt="Are you sure you want to delete this journal?"
      />
      <JournalFormDialog
        open={openEditJournalDialog}
        handleClose={handleCloseEditJournalDialog}
        journal={data?.data}
        journalId={journalId}
      />
    </Box>
  );
};

export default SingleJournal;
