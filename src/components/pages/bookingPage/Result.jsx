import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Result = ({ paymentResult }) => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const handleMyBookingRedirect = () => {
    navigate('/my-booking');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {paymentResult.success ? 'Booking Successful' : 'Booking Failed'}
        </Typography>
        {paymentResult.success ? (
          <>
            <Typography variant="body1" gutterBottom>
              Booking Success! Thank you for your booking!
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="error" gutterBottom>
            {paymentResult.errorMsg}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleHomeRedirect}>
            Home
          </Button>
          <Button variant="contained" color="secondary" onClick={handleMyBookingRedirect}>
            View my booking
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Result;