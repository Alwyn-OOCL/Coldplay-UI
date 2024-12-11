import React from "react";
import { Box, Chip } from "@mui/material";

const YearFilter = ({ uniqueYears, selectedYear, handleYearFilter }) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {uniqueYears.map((year) => (
        <Chip
          key={year}
          label={year}
          clickable
          sx={{
            backgroundColor: selectedYear === year ? "red" : "default",
            color: selectedYear === year ? "white" : "default",
          }}
          onClick={() => handleYearFilter(selectedYear === year ? "" : year)}
        />
      ))}
    </Box>
  );
};

export default YearFilter;
