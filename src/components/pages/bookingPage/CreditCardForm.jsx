import { Box, TextField } from '@mui/material';
import React from 'react';

const CreditCardForm = ({ formData, handleFieldChange, errors }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
    </Box>
  );
};

export default CreditCardForm;