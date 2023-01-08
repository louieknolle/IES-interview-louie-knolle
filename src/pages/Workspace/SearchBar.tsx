import React from "react";
import { TextField } from "@mui/material";
import { SearchBarProps } from "./Workspace";

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  return (
    <React.Fragment>
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        label="Search"
        color="secondary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "5%" }}
      />
    </React.Fragment>
  );
};

export default SearchBar;
