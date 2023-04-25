import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/UI/Spinner";
import { Alert } from "@mui/material";
import JournalEntriesTable from "../../components/Journal/JournalEntriesTable";

const SingleJournal = () => {
  const { journalId } = useParams();
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["single-journal", journalId],
    () => api.getJournal(journalId)
  );

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
  return <JournalEntriesTable entries={journal.entries} />;
};

export default SingleJournal;
