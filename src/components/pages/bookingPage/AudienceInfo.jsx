import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const AudienceInfo = ({ audienceDetails, handleChange, errors, setErrors }) => {
  return (
    <>
      {audienceDetails.map((audience, index) => (
        <Box
          key={index}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Audience {index + 1}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={audience.name || ""}
            onChange={(event) => {
              const newDetails = [...audienceDetails];
              newDetails[index] = {
                ...newDetails[index],
                name: event.target.value,
              };
              handleChange("audienceDetails")({
                target: { value: newDetails },
              });
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[`audienceName${index}`];
                return newErrors;
              });
            }}
            required
            error={!!errors[`audienceName${index}`]}
            helperText={errors[`audienceName${index}`]}
          />
          <TextField
            label="ID Card Number"
            variant="outlined"
            fullWidth
            value={audience.idCard || ""}
            onChange={(event) => {
              const newDetails = [...audienceDetails];
              newDetails[index] = {
                ...newDetails[index],
                idCard: event.target.value,
              };
              handleChange("audienceDetails")({
                target: { value: newDetails },
              });
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[`audienceIdCard${index}`];
                return newErrors;
              });
            }}
            required
            error={!!errors[`audienceIdCard${index}`]}
            helperText={errors[`audienceIdCard${index}`]}
          />
        </Box>
      ))}
    </>
  );
};

export default AudienceInfo;
