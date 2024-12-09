// src/components/BookingPage/Payment.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';

const Payment = ({ formData, handleChange, handleNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Credit Card Number is required';
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry Date is required';
    }
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    }
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
          Payment
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Credit Card Number"
            variant="outlined"
            fullWidth
            onChange={handleFieldChange('cardNumber')}
            value={formData.cardNumber}
            required
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            onChange={handleFieldChange('expiryDate')}
            value={formData.expiryDate}
            required
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            onChange={handleFieldChange('cvv')}
            value={formData.cvv}
            required
            error={!!errors.cvv}
            helperText={errors.cvv}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Pay Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Payment;