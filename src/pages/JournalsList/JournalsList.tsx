import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Container, Typography, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import JournalCard from "../../components/Journal/JournalCard";
import Spinner from "../../components/UI/Spinner";
import api from "../../services/api";
import React from "react";

export interface BasicJournal {
  entriesAmount: number;
  id: string;
  journalName: string;
}

const JournalsList = () => {
  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["journals"],
    api.getJournals
  );

  let content: ReactJSXElement = <Spinner />;
  if (isError) {
    let err: any = error?.response?.data;

    content = (
      <Alert severity="error">{err.message || "Could not load journals"}</Alert>
    );
  }

  const journals = data?.data || [];

  if (journals.length === 0 && !isLoading) content = <p>No journals</p>;

  if (journals.length > 0) {
    content = journals.map((journal: BasicJournal) => {
      // console.log(journal);
      return <JournalCard journal={journal} key={journal.id} />;
    });
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        color="secondary"
        sx={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
      >
        Your Journals
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {content}
      </Box>
    </Container>
  );
};

export default JournalsList;
