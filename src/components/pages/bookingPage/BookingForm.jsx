import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AudienceInfo from "./AudienceInfo";

const BookingForm = ({ formData, handleChange, handleNext, concert }) => {
  const [errors, setErrors] = useState({});
  const [isSaleTimeReached, setIsSaleTimeReached] = useState(false);
  const [countdown, setCountdown] = useState("");

  const areaOptions = concert.areas.map((area) => ({
    id: area.id,
    name: area.areaType,
  }));

  useEffect(() => {
    const checkSaleTime = () => {
      const currentTime = new Date();
      const saleTime = new Date(concert.concertSaleTime);
      setIsSaleTimeReached(currentTime >= saleTime);

      if (!isSaleTimeReached) {
        const timeDiff = saleTime - currentTime;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    checkSaleTime();
    const interval = setInterval(checkSaleTime, 1000); // Check every second

    return () => clearInterval(interval);
  }, [concert.concertSaleTime, isSaleTimeReached]);

  useEffect(() => {
    const noChooseIndex = formData.areaPreferences.indexOf("noChoose");
    if (noChooseIndex !== -1) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        for (let i = noChooseIndex; i < formData.areaPreferences.length; i++) {
          delete newErrors[`areaPreference${i}`];
        }
        return newErrors;
      });
    }
  }, [formData.areaPreferences]);

  const getAvailableOptions = (index) => {
    const selectedOptions = formData.areaPreferences.filter(
      (_, i) => i !== index
    );
    const availableOptions = areaOptions.filter(
      (option) => !selectedOptions.includes(option.id)
    );
    if (index > 0) {
      availableOptions.unshift({ id: "noChoose", name: "No Choose" });
    }
    if (index > 0 && formData.areaPreferences[index - 1] === "noChoose") {
      return [{ id: "noChoose", name: "No Choose" }];
    }
    return availableOptions;
  };

  const handleAreaChange = (index) => (event) => {
    const newPreferences = [...formData.areaPreferences];
    newPreferences[index] = event.target.value;
    if (event.target.value === "noChoose") {
      for (let i = index + 1; i < newPreferences.length; i++) {
        newPreferences[i] = "noChoose";
      }
    }
    handleChange("areaPreferences")({ target: { value: newPreferences } });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`areaPreference${index}`];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.audienceCount) {
      newErrors.audienceCount = "Number of audience is required";
    }
    let noChooseFound = false;
    formData.areaPreferences.forEach((preference, index) => {
      if (preference === "noChoose") {
        noChooseFound = true;
      }
      if (!preference && !noChooseFound) {
        newErrors[`areaPreference${index}`] = `Priority ${index + 1} is required`;
      }
    });
    formData.audienceDetails.forEach((audience, index) => {
      if (!audience.name) {
        newErrors[`audienceName${index}`] = `Name of audience ${index + 1} is required`;
      }
      if (!audience.idCard) {
        newErrors[`audienceIdCard${index}`] = `ID card number of audience ${index + 1} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleFieldChange = (field) => (event) => {
    handleChange(field)(event);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleAudienceChange = (event) => {
    if (!event.target.value) {
      event.target.value = 1;
    }
    let value = parseInt(event.target.value, 10);
    if (value > 20) {
      value = 20;
    } else if (value < 1) {
      value = 1;
    }
    handleFieldChange('audienceCount')({ target: { value } });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Booking Form
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl fullWidth error={!!errors.audienceCount}>
            <TextField
              label="Number of Audience"
              type="number"
              value={formData.audienceCount}
              onChange={handleAudienceChange}
              inputProps={{ min: 1, max: 20 }}
              fullWidth
              margin="normal"
            />
            {errors.audienceCount && (
              <Typography color="error">{errors.audienceCount}</Typography>
            )}
          </FormControl>
          <Typography variant="h6" component="div" gutterBottom>
            Area Preferences
          </Typography>
          {Array.from({ length: concert.areas.length }).map((_, index) => (
            <FormControl
              fullWidth
              key={index}
              error={!!errors[`areaPreference${index}`]}
            >
              <InputLabel>{`Priority ${index + 1}`}</InputLabel>
              <Select
                value={formData.areaPreferences[index] || ""}
                onChange={handleAreaChange(index)}
                label={`Priority ${index + 1}`}
              >
                {getAvailableOptions(index).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {errors[`areaPreference${index}`] && (
                <Typography color="error">
                  {errors[`areaPreference${index}`]}
                </Typography>
              )}
            </FormControl>
          ))}
          <AudienceInfo
            audienceDetails={formData.audienceDetails}
            handleChange={handleFieldChange}
            errors={errors}
            setErrors={setErrors}
          />
          <button
            className="button button-primary"
            onClick={handleSubmit}
            disabled={!isSaleTimeReached}
          >
            {isSaleTimeReached ? "Book Now" : "Sales Not Started"}
          </button>
          {!isSaleTimeReached && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              Sales start in: {countdown}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingForm;