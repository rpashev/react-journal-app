import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/UI/Spinner";
import { Alert, Box, Button } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import JournalEntriesTable from "../../components/Journal/JournalEntriesTable";
import JournalEntriesFilter from "../../components/Journal/JournalEntriesFilter";
import { Fragment, useState } from "react";
import EntryFormDialog from "../../components/Entry/EntryFormDialog";
import React from "react";
import EntryDetailsDialog from "../../components/Entry/EntryDetailsDialog";

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
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    let err: any = error?.response?.data;

    return (
      <Alert severity="error">{err.message || "Could not load journal"}</Alert>
    );
  }

  const onOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setSelectedEntryId(null);
  };
  const onOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedEntryId(null);
  };

  const onOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEntryId(null);
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
          setSelectedEntryId={setSelectedEntryId}
        />
      </Box>
      <EntryFormDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        entryId={null}
        journalId={journalId!}
      />
      <EntryFormDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        entryId={selectedEntryId}
        journalId={journalId!}
      />
      <EntryDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetailsDialog}
        entryId={selectedEntryId}
        journalId={journalId!}
      />
    </Fragment>
  );
};

export default SingleJournal;
