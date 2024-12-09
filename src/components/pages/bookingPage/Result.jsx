import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Result = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Booking Successful
        </Typography>
        <Typography variant="body1">
          Thank you for your booking! You will receive a confirmation email shortly.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Result;