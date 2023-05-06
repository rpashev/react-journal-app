import { Visibility, Edit, Delete } from "@material-ui/icons";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { Entry } from "./JournalEntriesTable";

interface Props {
  entry: Entry;
  onClickOpenEdit: (event: any, id: string) => void;
  onClickDelete: (event: any, id: string) => void;
  onClickOpenDetails: (event: any, id: string) => void;
}

export const JournalEntriesTableEntryCard = ({
  entry,
  onClickOpenEdit,
  onClickDelete,
  onClickOpenDetails,
}: Props) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Entry</Typography>
          <Typography variant="body1">{entry.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Date</Typography>
          <Typography variant="body1">
            {new Date(entry.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Actions</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="view"
              sx={{ width: "50px", height: "50px" }}
              onClick={(event) => onClickOpenDetails(event, entry._id)}
            >
              <Visibility />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="large"
              sx={{ width: "50px", height: "50px" }}
              onClick={(event) => onClickOpenEdit(event, entry._id)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              sx={{ width: "50px", height: "50px" }}
              onClick={(event) => onClickDelete(event, entry._id)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
