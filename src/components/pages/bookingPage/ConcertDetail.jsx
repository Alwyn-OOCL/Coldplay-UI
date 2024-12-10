import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const ConcertDetail = ({ concert }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {concert.concertName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Start Time:</strong> {new Date(concert.concertStartTime).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Duration:</strong> {concert.concertDuration} hours
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Venue:</strong> {concert.venueAddress}, {concert.venueCity}, {concert.venueCountry}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {concert.concertDescription}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Floor plan
        </Typography>
        <img
          src={concert.venueImage}
          alt="Sitting Plan"
          style={{ width: '100%', height: 'auto', marginTop: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Available Areas
        </Typography>
        {concert.areas.map((area) => (
          <Box key={area.id} sx={{ marginBottom: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Area Type:</strong> {area.areaType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price:</strong> ${area.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Available Seats:</strong> {area.available}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ConcertDetail;