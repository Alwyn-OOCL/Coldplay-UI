import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
