import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const ConcertDetail = ({ orderDetail, totalAmount }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          image={orderDetail.image}
          alt={orderDetail.concertName}
        />
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography component="div" variant="h4">
            {orderDetail.concertName}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="div">
            {new Date(orderDetail.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            Duration: {orderDetail.duration} hours
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            {orderDetail.country}, {orderDetail.city}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            Address: {orderDetail.address}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            Area: {orderDetail.areaType} (${orderDetail.areaPrice})
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            Description: {orderDetail.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            Total Amount: ${orderDetail.areaPrice} X {orderDetail.tickets.length} = ${totalAmount}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConcertDetail;