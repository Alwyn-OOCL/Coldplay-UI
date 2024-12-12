import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingPayment = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            opacity: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default LoadingPayment;