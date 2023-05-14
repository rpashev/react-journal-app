import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@material-ui/icons";
import { grey } from "@mui/material/colors";
import { Fragment, useEffect, useMemo, useState } from "react";
import { filterByDate } from "../../utils/validations";
import { entryContent } from "../../utils/formatters";
import React from "react";
import { JournalEntriesTableEntryCard } from "./JournalEntriesTableEntryCard";

export interface Entry {
  body: string;
  title: string;
  _id: string;
  date: string;
}
interface Props {
  entries: Entry[];
  searchFilter: string;
  timeFilter: string;
  onOpenDetailsDialog: () => void;
  onOpenEditDialog: () => void;
  onOpenDeleteDialog: () => void;
  setSelectedEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
}

const headCells = [
  {
    id: "title",
    label: "Entry",
    isSortable: true,
    isVisible: true,
  },
  { id: "data", isVisible: true, isSortable: true, label: "Date" },
  { id: "actions", isVisible: true, label: "Actions" },
];

const JournalEntriesTable = ({
  entries,
  searchFilter,
  timeFilter,
  onOpenDetailsDialog,
  onOpenEditDialog,
  onOpenDeleteDialog,
  setSelectedEntry,
}: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(entries);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  useEffect(() => {
    console.log(searchFilter);

    setFilteredRows(
      entries.filter((e) => {
        if (
          filterByDate(e.date, timeFilter) &&
          (!timeFilter ||
            e.body?.toLowerCase().includes(searchFilter.toLowerCase()) ||
            e.title?.toLowerCase().includes(searchFilter.toLowerCase()))
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [searchFilter, timeFilter, entries]);

  const visibleRows = useMemo(() => {
    return filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredRows, rowsPerPage, page, entries]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onRowClick = (event: any, entry: Entry) => {
    event.stopPropagation();
    setSelectedEntry(entry);
    onOpenDetailsDialog();
  };

  const onClickOpenEdit = (event: any, entry: Entry) => {
    event.stopPropagation();
    setSelectedEntry(entry);
    onOpenEditDialog();
  };

  const onClickDelete = (event: any, entry: Entry) => {
    event.stopPropagation();
    setSelectedEntry(entry);
    onOpenDeleteDialog();
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300, maxWidth: "100%" }}
          aria-label="simple table"
          size="small"
        >
          <TableHead className="JournalEntriesTable-desktop">
            <TableRow sx={{ backgroundColor: grey[100] }}>
              {headCells.map((c) => (
                <TableCell sx={{ fontWeight: "bold" }} key={c.id}>
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              color: "white",
            }}
            className="JournalEntriesTable__Mobile-cards"
          >
            {visibleRows.map((e) => {
              return (
                <JournalEntriesTableEntryCard
                  onClickOpenEdit={onClickOpenEdit}
                  onClickDelete={onClickDelete}
                  onClickOpenDetails={onRowClick}
                  key={e._id}
                  entry={e}
                />
              );
            })}
          </TableBody>
          <TableBody className="JournalEntriesTable-desktop">
            {visibleRows.map((e) => (
              <TableRow
                hover
                onClick={(event) => onRowClick(event, e)}
                key={e._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="left" component="th" scope="row">
                  <Typography
                    variant="h6"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="400px"
                    whiteSpace="nowrap"
                  >
                    {e.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="inline-block"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="300px"
                    whiteSpace="nowrap"
                  >
                    {entryContent(e.body)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {new Date(e.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="view"
                    onClick={(event) => onRowClick(event, e)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={(event) => onClickOpenEdit(event, e)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={(event) => onClickDelete(event, e)}
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default JournalEntriesTable;
