import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const ConcertDetail = ({ concert }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {concert.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Start Time:</strong> {new Date(concert.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Duration:</strong> {concert.duration}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Venue:</strong> {concert.venue.address}, {concert.venue.city}, {concert.venue.country}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Floor plan
        </Typography>
        <img
          src={concert.venue.sittingPlan}
          alt="Sitting Plan"
          style={{ width: '100%', height: 'auto', marginTop: '20px' }}
        />
      </Grid>
    </Grid>
  );
};

export default ConcertDetail;