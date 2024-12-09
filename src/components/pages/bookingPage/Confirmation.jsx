import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const Confirmation = ({ formData, handleNext }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Confirmation
        </Typography>
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Number of Audience:</strong> {formData.audienceCount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Area Preferences:</strong>
          </Typography>
          <Box sx={{ pl: 2 }}>
            {formData.areaPreferences.map((preference, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                <strong>Priority {index + 1}:</strong> {preference}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" gutterBottom>
            <strong>Audience Details:</strong>
          </Typography>
          <Box sx={{ pl: 2 }}>
            {formData.audienceDetails.map((audience, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Audience {index + 1} Name:</strong> {audience.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Audience {index + 1} ID Card Number:</strong> {audience.idCard}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Button variant="contained" color="primary" onClick={handleNext} sx={{ mt: 2 }}>
          Next
        </Button>
      </CardContent>
    </Card>
  );
};

export default Confirmation;