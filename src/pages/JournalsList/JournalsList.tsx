import axios from "axios";
import { useEffect, useState } from "react";

const JournalsList = () => {
  const [journals, setJournals] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}journals`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmIyZjMzMDYxNmNkZGRiNzFlNjJmYWQiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKb2hueSIsImlhdCI6MTY1ODQxMDE0M30.ciJ4Zw3pwOea88MsU2VWOELtqd6x4iJByRhfW8s6rEk",
        },
      })
      .then((data) => setJournals(data.data));
  }, []);

  useEffect(() => console.log(journals), [journals]);

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
