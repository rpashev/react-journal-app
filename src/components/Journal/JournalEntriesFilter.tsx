import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Search from "@material-ui/icons/Search";
import React from "react";

interface Props {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  searchFilter: string;
  setTimeFilter: React.Dispatch<React.SetStateAction<string>>;
  timeFilter: string;
}

const JournalEntriesFilter = ({
  setSearchFilter,
  searchFilter,
  timeFilter,
  setTimeFilter,
}: Props) => {
  const timeOptions = [
    "All Time",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "This Year",
  ];

  return (
    <Box
      sx={{ display: "flex", gap: "0.5rem" }}
      className="JournalEntriesFilter"
    >
      <Select
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
        sx={{ width: "200px" }}
        size="small"
      >
        {timeOptions.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>

      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        placeholder="Search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default JournalEntriesFilter;
