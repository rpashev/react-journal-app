import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/UI/Spinner";
import { Alert, Box, Button } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import JournalEntriesTable from "../../components/Journal/JournalEntriesTable";
import JournalEntriesFilter from "../../components/Journal/JournalEntriesFilter";
import { useEffect, useState } from "react";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const SingleJournal = () => {
  const { journalId } = useParams();
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["single-journal", journalId],
    () => api.getJournal(journalId)
  );

  const [searchFilter, setSearchFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    let err: any = error?.response?.data;

    return (
      <Alert severity="error">{err.message || "Could not load journal"}</Alert>
    );
  }

  const journal = data?.data || [];
  console.log(journal);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        maxWidth: 950,
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
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            onClick={(e: MouseEvent) => console.log("open dialog")}
          >
            NEW ENTRY
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<ArrowBackIcon />}
            onClick={(e: MouseEvent) => console.log("back")}
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
        entries={journal.entries}
        searchFilter={searchFilter}
        timeFilter={timeFilter}
      />
    </Box>
  );
};

export default SingleJournal;
