import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AudienceInfo from './AudienceInfo';

const BookingForm = ({ formData, handleChange, handleNext }) => {
  const [errors, setErrors] = useState({});
  const audienceOptions = Array.from({ length: 100 }, (_, i) => i + 1);
  const areaOptions = ['VIP', 'Area 1', 'Area 2'];

  const getAvailableOptions = (index) => {
    const selectedOptions = formData.areaPreferences.filter((_, i) => i !== index);
    const availableOptions = areaOptions.filter(option => !selectedOptions.includes(option));
    if (index > 0) {
      availableOptions.unshift('No Choose');
    }
    if (index === 2 && formData.areaPreferences[1] === 'No Choose') {
      return ['No Choose'];
    }
    return availableOptions;
  };

  const handleAreaChange = (index) => (event) => {
    const newPreferences = [...formData.areaPreferences];
    newPreferences[index] = event.target.value;
    if (index === 1 && event.target.value === 'No Choose') {
      newPreferences[2] = 'No Choose';
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`areaPreference${index}`];
        delete newErrors[`areaPreference2`];
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`areaPreference${index}`];
        return newErrors;
      });
    }
    handleChange('areaPreferences')({ target: { value: newPreferences } });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.audienceCount) {
      newErrors.audienceCount = 'Number of audience is required';
    }
    formData.areaPreferences.forEach((preference, index) => {
      if (!preference) {
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Booking Form
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth error={!!errors.audienceCount}>
            <InputLabel>Number of Audience</InputLabel>
            <Select
              value={formData.audienceCount}
              onChange={handleFieldChange('audienceCount')}
              label="Number of Audience"
            >
              {audienceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors.audienceCount && <Typography color="error">{errors.audienceCount}</Typography>}
          </FormControl>
          <Typography variant="h6" component="div" gutterBottom>
            Area Preferences
          </Typography>
          {areaOptions.map((_, index) => (
            <FormControl fullWidth key={index} error={!!errors[`areaPreference${index}`]}>
              <InputLabel>{`Priority ${index + 1}`}</InputLabel>
              <Select
                value={formData.areaPreferences[index]}
                onChange={handleAreaChange(index)}
                label={`Priority ${index + 1}`}
              >
                {getAvailableOptions(index).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors[`areaPreference${index}`] && <Typography color="error">{errors[`areaPreference${index}`]}</Typography>}
            </FormControl>
          ))}
          <AudienceInfo
            audienceDetails={formData.audienceDetails}
            handleChange={handleFieldChange}
            errors={errors}
            setErrors={setErrors}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingForm;