import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SortOrder = ({ sortOrder, handleSortOrder }) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortOrder} onChange={handleSortOrder} label="Sort By">
        <MenuItem value="asc">Start Time (Asc)</MenuItem>
        <MenuItem value="desc">Start Time (Desc)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOrder;
