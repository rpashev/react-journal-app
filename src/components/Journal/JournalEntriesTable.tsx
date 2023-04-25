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
} from "@mui/material";
import { Edit, Delete, Visibility } from "@material-ui/icons";
import { grey } from "@mui/material/colors";

export interface Entry {
  body: string;
  title: string;
  _id: string;
  date: string;
}
interface Props {
  entries: Entry[];
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

const JournalEntriesTable = ({ entries }: Props) => {
  const onRowClick = (event: any, id: string) => {
    console.log(id);
  };

  const entryContent = (body: string) => {
    if (body) {
      let cleanBody = body
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, " ");
      if (cleanBody.length > 40) {
        cleanBody = cleanBody.slice(0, 40) + "...";
      }
      return cleanBody;
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1100, margin: "3rem auto" }}
    >
      <Table
        sx={{ minWidth: 650, maxWidth: "100%" }}
        aria-label="simple table"
        size="small"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: grey[100] }}>
            {headCells.map((c) => (
              <TableCell sx={{ fontWeight: "bold" }} key={c.id}>
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((e) => (
            <TableRow
              hover
              onClick={(event) => onRowClick(event, e._id)}
              key={e._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell align="left" component="th" scope="row">
                <Typography variant="h6">{e.title}</Typography>
                <Typography variant="caption">
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
                <IconButton aria-label="view">
                  <Visibility />
                </IconButton>
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JournalEntriesTable;
