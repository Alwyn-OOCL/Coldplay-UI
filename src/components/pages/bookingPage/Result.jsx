import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';

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
          <button className="button button-primary" onClick={handleHomeRedirect}>
            Home
          </button>
          <button className="button button-secondary" onClick={handleMyBookingRedirect}>
            View my booking
          </button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Result;