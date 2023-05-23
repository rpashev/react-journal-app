import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Container, Typography, Alert, Button } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import JournalCard from "../components/Journal/JournalCard";
import Spinner from "../components/UI/Spinner";
import api from "../services/api";
import React, { useState } from "react";
import JournalFormDialog from "../components/Journal/JournalFormDialog";

export interface BasicJournal {
  entriesAmount: number;
  id: string;
  journalName: string;
  description?: string;
}

const JournalsList = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const { data, error, isError, isLoading } = useQuery<any, AxiosError>(
    ["journals"],
    api.getJournals
  );

  let content: ReactJSXElement = <Spinner />;
  if (isError) {
    let err: any = error?.response?.data;

    content = (
      <Alert severity="error">
        {err?.message || "Could not load journals"}
      </Alert>
    );
  }

  const journals = data?.data || [];

  if (journals.length === 0 && !isLoading) content = <p>No journals</p>;

  if (journals.length > 0) {
    content = journals.map((journal: BasicJournal) => {
      return <JournalCard journal={journal} key={journal.id} />;
    });
  }

  const onOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          color="secondary"
          sx={{ textAlign: "center", marginTop: 3, marginBottom: 3 }}
        >
          YOUR JOURNALS
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          onClick={onOpenAddDialog}
        >
          NEW JOURNAL
        </Button>
      </Box>
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
      <JournalFormDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
      />
    </Container>
  );
};

export default JournalsList;
