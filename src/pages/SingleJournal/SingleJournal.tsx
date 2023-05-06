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
import { Fragment, useEffect, useState } from "react";
import EntryFormDialog from "../../components/Entry/EntryFormDialog";
import React from "react";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const SingleJournal = () => {
  const { journalId } = useParams();
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["single-journal", journalId],
    () => api.getJournal(journalId)
  );

  const [searchFilter, setSearchFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [openDialog, setOpenDialog] = useState(false);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    let err: any = error?.response?.data;

    return (
      <Alert severity="error">{err.message || "Could not load journal"}</Alert>
    );
  }
  // useEffect(() => {
  //   console.log(datae );
  // }, [data]);

  // let journal = data?.data || [];

  // console.log(journal);

  const onAddNewEntry = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
              onClick={onAddNewEntry}
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
        />
      </Box>
      <EntryFormDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        journalId={journalId!}
      />
    </Fragment>
  );
};

export default SingleJournal;
