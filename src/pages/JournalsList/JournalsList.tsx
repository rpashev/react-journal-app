import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import AuthContext from "../../context/user-context";
import api from "../../services/api";

const JournalsList = () => {
  const context = useContext(AuthContext);
  console.log(context);

  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["journals"],
    api.getJournals
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    let err: any = error?.response?.data;

    return <p>{err.message || "Could not load journals"}</p>;
  }

  const journals = data.data;

  if (journals.length === 0) return <p>No journals</p>;

  return (
    <div>
      {journals.map((journal: any) => {
        return (
          <>
            <p>{journal.journalName}</p>
            <p>{journal.id}</p>
            <p>{journal.entriesAmount}</p>
          </>
        );
      })}
    </div>
  );
};

export default JournalsList;
